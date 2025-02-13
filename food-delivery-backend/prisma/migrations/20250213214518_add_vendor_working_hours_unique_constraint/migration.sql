/*
  Warnings:

  - A unique constraint covering the columns `[vendor_id,day_of_week]` on the table `vendor_working_hours` will be added. If there are existing duplicate values, this will fail.
  - Made the column `vendor_id` on table `vendor_working_hours` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "vendor_working_hours" DROP CONSTRAINT "vendor_working_hours_vendor_id_fkey";

-- AlterTable
ALTER TABLE "vendor_working_hours" ALTER COLUMN "vendor_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vendor_working_hours_vendor_id_day_of_week_key" ON "vendor_working_hours"("vendor_id", "day_of_week");

-- AddForeignKey
ALTER TABLE "vendor_working_hours" ADD CONSTRAINT "vendor_working_hours_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
