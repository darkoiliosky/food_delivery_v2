import request from "supertest";
import { app } from "../app";

let server: any;

beforeAll(async () => {
  server = app.listen(5000);
});

afterAll(async () => {
  server.close();
});

describe.skip("Courier Controller Tests", () => {
  it("should return 200 for getting accepted orders", async () => {
    const response = await request(app)
      .get("/api/courier/orders/accepted")
      .set("Authorization", "Bearer courier-token");
    expect(response.status).toBe(200);
  });

  it("should accept an order", async () => {
    const response = await request(app)
      .patch("/api/courier/orders/accept")
      .set("Authorization", "Bearer courier-token")
      .send({ orderId: 1 });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("accepted");
  });

  it("should cancel an accepted order", async () => {
    const response = await request(app)
      .patch("/api/courier/orders/cancel")
      .set("Authorization", "Bearer courier-token")
      .send({ orderId: 1 });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("pending");
  });
});
