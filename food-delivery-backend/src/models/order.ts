import { PrismaClient, orders } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrderById = async (orderId: number) => {
  const order = await prisma.orders.findUnique({
    where: { id: orderId },
    include: { order_items: true }, // Include order items in the response
  });
  return order;
};

export const createOrder = async (userId: number, items: any[]) => {
  const order = await prisma.orders.create({
    data: {
      user_id: userId,
      total_price: items.reduce(
        (total, item) => total + item.item_price * item.quantity,
        0
      ),
      order_items: {
        create: items,
      },
    },
  });
  return order;
};

export const cancelOrder = async (orderId: number) => {
  const order = await prisma.orders.update({
    where: { id: orderId },
    data: { status: "cancelled" },
  });
  return order;
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const order = await prisma.orders.update({
    where: { id: orderId },
    data: { status },
  });
  return order;
};
