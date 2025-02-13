import { Router } from "express";
import * as adminController from "../controllers/adminController";
import { authenticateAdmin } from "../middlewares/authMiddleware";

const router = Router();

// Get all vendors
router.get("/vendors", authenticateAdmin, adminController.getVendors);

// Get all users
router.get("/users", authenticateAdmin, adminController.getUsers);

// Get all orders
router.get("/orders", authenticateAdmin, adminController.getOrders);

// Get all deliveries
router.get("/deliveries", authenticateAdmin, adminController.getDeliveries);

// Toggle user status (activate/deactivate)
router.patch(
  "/users/status",
  authenticateAdmin,
  adminController.toggleUserStatus
);

export default router;
