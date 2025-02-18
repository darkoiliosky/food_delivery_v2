import prisma from "../prisma";
import bcrypt from "bcryptjs";

export const createUser = async (
  name: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  role: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      name,
      lastname,
      email,
      phone,
      password: hashedPassword,
      role,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  return user;
};

export const getUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: { id },
  });
  return user;
};

export const updateUserStatus = async (id: number, status: boolean) => {
  const updatedUser = await prisma.users.update({
    where: { id },
    data: { is_verified: status },
  });
  return updatedUser;
};

export const verifyPassword = async (
  inputPassword: string,
  storedPassword: string
) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};
