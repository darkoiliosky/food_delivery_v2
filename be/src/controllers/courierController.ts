import { Request, Response } from "express";
import prisma from "../prisma";

export const getNotAcceptedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        status: "pending",
      },
    });
    res.json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const getAcceptedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        status: "accepted",
      },
    });
    res.json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

type AcceptOrderRequest = {
  orderId: number;
};

export const cancelAcceptedOrder = async (
  req: Request<{}, {}, CancelAcceptedOrderRequest>,
  res: Response
) => {
  try {
    const { orderId } = req.body;
    const order = await prisma.orders.update({
      where: { id: orderId },
      data: { status: "pending" }, // Revert to pending if mistakenly accepted
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

export const acceptOrder = async (
  req: Request<{}, {}, AcceptOrderRequest>,
  res: Response
) => {
  try {
    const { orderId } = req.body;
    const order = await prisma.orders.update({
      where: { id: orderId },
      data: { status: "accepted" },
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

type CancelAcceptedOrderRequest = {
  orderId: number;
};
