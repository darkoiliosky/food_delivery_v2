import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes.ts";
import courierRoutes from "./routes/courierRoutes.ts";
import vendorRoutes from "./routes/vendorRoutes.ts";
import customerRoutes from "./routes/customerRoutes.ts";
import { errorHandler } from "./middlewares/errorMiddleware.ts";

export const app = express();

app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/courier", courierRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/customer", customerRoutes);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
