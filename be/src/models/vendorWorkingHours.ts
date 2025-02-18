import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWorkingHoursByVendor = async (vendorId: number) => {
  const workingHours = await prisma.vendor_working_hours.findMany({
    where: { vendor_id: vendorId },
  });
  return workingHours;
};

export const updateWorkingHours = async (
  vendorId: number,
  dayOfWeek: number,
  openTime: Date,
  closeTime: Date
) => {
  const updatedWorkingHours = await prisma.vendor_working_hours.upsert({
    where: {
      vendor_id_day_of_week: { vendor_id: vendorId, day_of_week: dayOfWeek },
    },
    update: { open_time: openTime, close_time: closeTime },
    create: {
      vendor_id: vendorId,
      day_of_week: dayOfWeek,
      open_time: openTime,
      close_time: closeTime,
    },
  });
  return updatedWorkingHours;
};
