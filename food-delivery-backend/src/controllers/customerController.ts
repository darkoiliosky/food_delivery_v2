import { Request, Response } from "express";
import prisma from "../prisma";

type OrderItem = {
  menu_item_id: number;
  quantity: number;
  item_price: number;
};

type CreateOrderRequest = {
  userId: number;
  items: OrderItem[];
};

export const createOrder = async (
  req: Request<{}, {}, CreateOrderRequest>,
  res: Response
) => {
  try {
    const { userId, items } = req.body;

    // Calculate the total price of the order
    const totalPrice = items.reduce((total: number, item: any) => {
      return total + item.item_price * item.quantity;
    }, 0);

    const order = await prisma.orders.create({
      data: {
        user_id: userId,
        total_price: totalPrice,
        order_items: { create: items },
      },
    });

    res.json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

type CancelOrderRequest = {
  orderId: number;
};

export const cancelOrder = async (
  req: Request<{}, {}, CancelOrderRequest>,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.body;

    // Fetch the order
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
    });

    // If the order doesn't exist, return a 404 error
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // Check if the order is still in pending state (only cancel if pending)
    if (order.status === "pending") {
      const updatedOrder = await prisma.orders.update({
        where: { id: orderId },
        data: { status: "cancelled" },
      });
      res.json(updatedOrder);
    } else {
      res.status(400).json({
        message: "Only orders in pending state can be cancelled",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
