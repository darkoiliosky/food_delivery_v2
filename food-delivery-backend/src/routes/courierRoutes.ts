import { Router } from "express";
import * as courierController from "../controllers/courierController";
import { authenticateCourier } from "../middlewares/authMiddleware"; // Authentication middleware

const router = Router();

// Get all not-accepted orders
router.get(
  "/orders/not-accepted",
  authenticateCourier,
  courierController.getNotAcceptedOrders
);

// Get all accepted orders
router.get(
  "/orders/accepted",
  authenticateCourier,
  courierController.getAcceptedOrders
);

// Accept an order
router.patch(
  "/orders/accept",
  authenticateCourier,
  courierController.acceptOrder
);

// Cancel an accepted order (mistake)
router.patch(
  "/orders/cancel",
  authenticateCourier,
  courierController.cancelAcceptedOrder
);

export default router;
