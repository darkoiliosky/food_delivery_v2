import { Router } from "express";
import * as vendorController from "../controllers/vendorController";
import { authenticateVendor } from "../middlewares/authMiddleware"; // Authentication middleware

const router = Router();

// Add a new menu item
router.post("/menu-item", authenticateVendor, vendorController.addMenuItem);

// Update a menu item
router.patch("/menu-item", authenticateVendor, vendorController.updateMenuItem);

// Delete a menu item
router.delete(
  "/menu-item",
  authenticateVendor,
  vendorController.deleteMenuItem
);

// Update working hours for a vendor
router.patch(
  "/working-hours",
  authenticateVendor,
  vendorController.updateWorkingHours
);

export default router;
