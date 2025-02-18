import { Request, Response } from "express";
import prisma from "../prisma";

type AddMenuItemRequest = {
  name: string;
  price: number;
  vendorId: number;
};

export const addMenuItem = async (
  req: Request<{}, {}, AddMenuItemRequest>,
  res: Response
) => {
  try {
    const { name, price, vendorId } = req.body;
    const menuItem = await prisma.menu_items.create({
      data: { name, price, vendor_id: vendorId },
    });
    res.json(menuItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

type UpdateMenuItemRequest = {
  itemId: number;
  name: string;
  price: number;
};

export const updateMenuItem = async (
  req: Request<{}, {}, UpdateMenuItemRequest>,
  res: Response
) => {
  try {
    const { itemId, name, price } = req.body;
    const menuItem = await prisma.menu_items.update({
      where: { id: itemId },
      data: { name, price },
    });
    res.json(menuItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

type DeleteMenuItemRequest = {
  itemId: number;
};

export const deleteMenuItem = async (
  req: Request<{}, {}, DeleteMenuItemRequest>,
  res: Response
) => {
  try {
    const { itemId } = req.body;
    await prisma.menu_items.delete({ where: { id: itemId } });
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

type UpdateWorkingHoursRequest = {
  vendorId: number;
  dayOfWeek: number;
  openTime: Date;
  closeTime: Date;
};

export const updateWorkingHours = async (
  req: Request<{}, {}, UpdateWorkingHoursRequest>,
  res: Response
) => {
  try {
    const { vendorId, dayOfWeek, openTime, closeTime } = req.body;
    const workingHours = await prisma.vendor_working_hours.updateMany({
      where: { vendor_id: vendorId, day_of_week: dayOfWeek },
      data: { open_time: openTime, close_time: closeTime },
    });
    res.json(workingHours);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
