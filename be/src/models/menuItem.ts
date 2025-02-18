import { PrismaClient, menu_items } from "@prisma/client";

const prisma = new PrismaClient();

export const getMenuItemsByVendor = async (vendorId: number) => {
  const items = await prisma.menu_items.findMany({
    where: { vendor_id: vendorId },
  });
  return items;
};

export const createMenuItem = async (
  name: string,
  price: number,
  vendorId: number
) => {
  const menuItem = await prisma.menu_items.create({
    data: {
      name,
      price,
      vendor_id: vendorId,
    },
  });
  return menuItem;
};
