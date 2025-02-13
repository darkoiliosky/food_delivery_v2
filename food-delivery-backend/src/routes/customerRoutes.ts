import { Router } from "express";
import * as customerController from "../controllers/customerController";
import { authenticateCustomer } from "../middlewares/authMiddleware"; // Authentication middleware

const router = Router();

// Create a new order
router.post("/order", authenticateCustomer, customerController.createOrder);

// Cancel an order
router.patch(
  "/order/cancel",
  authenticateCustomer,
  customerController.cancelOrder
);

export default router;
