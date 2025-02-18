import { PrismaClient, vendors } from "@prisma/client";

const prisma = new PrismaClient();

export const getVendorById = async (id: number) => {
  const vendor = await prisma.vendors.findUnique({
    where: { id },
  });
  return vendor;
};

export const createVendor = async (
  name: string,
  type: string,
  ownerId: number
) => {
  const vendor = await prisma.vendors.create({
    data: {
      name,
      type,
      owner_id: ownerId,
    },
  });
  return vendor;
};
