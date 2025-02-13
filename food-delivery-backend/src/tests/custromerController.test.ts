import request from "supertest";
import { app } from "../app";

let server: any;

beforeAll(async () => {
  server = app.listen(5000);
});

afterAll(async () => {
  server.close();
});

describe.skip("Customer Controller Tests", () => {
  it("should create an order", async () => {
    const response = await request(app)
      .post("/api/customer/order")
      .set("Authorization", "Bearer customer-token")
      .send({
        userId: 1,
        items: [{ menu_item_id: 1, quantity: 2, item_price: 5 }],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("total_price");
  });

  it("should cancel an order", async () => {
    const response = await request(app)
      .patch("/api/customer/order/cancel")
      .set("Authorization", "Bearer customer-token")
      .send({ orderId: 1 });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("cancelled");
  });
});
