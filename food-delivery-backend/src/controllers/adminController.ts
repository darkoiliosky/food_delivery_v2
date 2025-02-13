import { Request, Response } from "express";
import prisma from "../prisma";

type GetVendorsQuery = {
  search?: string;
};

export const getVendors = async (
  req: Request<{}, {}, {}, GetVendorsQuery>,
  res: Response
) => {
  try {
    const vendors = await prisma.vendors.findMany({
      where: {
        name: {
          contains: req.query.search || "",
        },
        // Add any other filters here
      },
      orderBy: {
        name: "asc", // Default sort by name
      },
    });
    res.json(vendors);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.orders.findMany();
    res.json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const getDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await prisma.deliveries.findMany();
    res.json(deliveries);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

type ToggleUserStatusRequest = {
  userId: number;
  status: boolean;
};

export const toggleUserStatus = async (
  req: Request<{}, {}, ToggleUserStatusRequest>,
  res: Response
) => {
  try {
    const { userId, status } = req.body;
    const user = await prisma.users.update({
      where: { id: userId },
      data: { is_verified: status },
    });
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
