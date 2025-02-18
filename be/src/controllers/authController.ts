import { Request, Response } from "express";
import * as authService from "../services/authService";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

type RegisterRequestBody = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

type ForgotPasswordRequestBody = {
  email: string;
};

type ResetPasswordRequestBody = {
  resetToken: string;
  newPassword: string;
};

// Controller function for registering a user
export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  try {
    const { name, lastname, email, phone, password } = req.body;
    await authService.registerUser({ name, lastname, email, phone, password });
    res
      .status(201)
      .json({ message: "Registration successful. Please verify your email." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function for verifying the user's email
export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;

  if (!token) {
    res.status(400).json({ message: "No token provided" });
    return;
  }

  try {
    // Verify and decode the token
    const decoded: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    // Find user by email and verify their account
    const user = await prisma.users.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the user to mark them as verified
    await prisma.users.update({
      where: { email: decoded.email },
      data: {
        is_verified: true,
        verification_token: null,
        token_expires: null,
      }, // Clear the token
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// Controller function for logging in a user
export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function for forgot password
export const forgotPassword = async (
  req: Request<{}, {}, ForgotPasswordRequestBody>,
  res: Response
) => {
  try {
    const { email } = req.body;
    await authService.sendResetPasswordEmail(email);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function for resetting password
export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordRequestBody>,
  res: Response
) => {
  try {
    const { resetToken, newPassword } = req.body;
    await authService.resetPassword({ resetToken, newPassword });
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
