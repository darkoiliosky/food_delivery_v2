import prisma from "../prisma"; // import prisma client
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

type RegisterUserData = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
};

type LoginUserData = {
  email: string;
  password: string;
};

type ResetPasswordData = {
  resetToken: string;
  newPassword: string;
};

// Setup for email sending
const transporter = nodemailer.createTransport({
  service: "gmail", // You can choose another service if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Service for registering a new user
export const registerUser = async ({
  name,
  lastname,
  email,
  phone,
  password,
}: RegisterUserData) => {
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = jwt.sign(
    { email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h", // token expires in 1 hour
    }
  );

  const newUser = await prisma.users.create({
    data: {
      name,
      lastname,
      email,
      phone,
      password: hashedPassword,
      verification_token: verificationToken,
      role: "customer",
    },
  });

  // Send verification email
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
  await transporter.sendMail({
    to: email,
    subject: "Email Verification",
    html: `<h1>Welcome to Food Delivery</h1><p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  });

  return newUser;
};

// Service for logging in a user
export const loginUser = async ({ email, password }: LoginUserData) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user || !user.is_verified)
    throw new Error("User not found or email not verified");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

// Service for sending reset password email
export const sendResetPasswordEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  await prisma.users.update({
    where: { email },
    data: {
      reset_token: resetToken,
      token_expires: new Date(Date.now() + 3600000),
    }, // 1 hour expiry
  });

  // Send email with reset password link
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    html: `<h1>Password Reset</h1><p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};

// Service for resetting a user's password
export const resetPassword = async ({
  resetToken,
  newPassword,
}: ResetPasswordData) => {
  const decoded: any = jwt.verify(resetToken, process.env.JWT_SECRET as string);
  const user = await prisma.users.findUnique({
    where: { email: decoded.email },
  });

  if (!user || new Date(user.token_expires) < new Date())
    throw new Error("Token is expired or invalid");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.users.update({
    where: { email: user.email },
    data: { password: hashedPassword, reset_token: null, token_expires: null },
  });
};
