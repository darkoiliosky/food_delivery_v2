import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: { id },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  return user;
};

export const createUser = async (
  name: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  role: string
) => {
  const user = await prisma.users.create({
    data: {
      name,
      lastname,
      email,
      phone,
      password,
      role,
    },
  });
  return user;
};

export const updateUserStatus = async (userId: number, status: boolean) => {
  const user = await prisma.users.update({
    where: { id: userId },
    data: { is_verified: status },
  });
  return user;
};
