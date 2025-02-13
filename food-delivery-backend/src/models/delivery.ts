import { PrismaClient, deliveries } from "@prisma/client";

const prisma = new PrismaClient();

export const getDeliveriesByUser = async (userId: number) => {
  const deliveriesList = await prisma.deliveries.findMany({
    where: { delivery_user_id: userId },
  });
  return deliveriesList;
};

export const createDelivery = async (
  orderId: number,
  deliveryUserId: number,
  status: string,
  location: string
) => {
  const delivery = await prisma.deliveries.create({
    data: {
      order_id: orderId,
      delivery_user_id: deliveryUserId,
      status,
      location,
    },
  });
  return delivery;
};

export const updateDeliveryStatus = async (
  deliveryId: number,
  status: string
) => {
  const updatedDelivery = await prisma.deliveries.update({
    where: { id: deliveryId },
    data: { status },
  });
  return updatedDelivery;
};
