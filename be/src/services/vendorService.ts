import prisma from "../prisma";

export const addMenuItem = async (
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

export const updateMenuItem = async (
  menuItemId: number,
  name: string,
  price: number
) => {
  const updatedMenuItem = await prisma.menu_items.update({
    where: { id: menuItemId },
    data: { name, price },
  });
  return updatedMenuItem;
};

export const deleteMenuItem = async (menuItemId: number) => {
  await prisma.menu_items.delete({
    where: { id: menuItemId },
  });
  return { message: "Menu item deleted" };
};
