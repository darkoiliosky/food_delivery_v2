import request from "supertest";
import { app } from "../app";

let server: any;

beforeAll(async () => {
  server = app.listen(5000);
});

afterAll(async () => {
  server.close();
});

describe.skip("Vendor Controller Tests", () => {
  it("should add a new menu item", async () => {
    const response = await request(app)
      .post("/api/vendor/menu-item")
      .set("Authorization", "Bearer vendor-token")
      .send({ name: "Burger", price: 5, vendorId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Burger");
  });

  it("should update a menu item", async () => {
    const response = await request(app)
      .patch("/api/vendor/menu-item")
      .set("Authorization", "Bearer vendor-token")
      .send({ itemId: 1, name: "Cheeseburger", price: 6 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Cheeseburger");
  });

  it("should delete a menu item", async () => {
    const response = await request(app)
      .delete("/api/vendor/menu-item")
      .set("Authorization", "Bearer vendor-token")
      .send({ itemId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Menu item deleted");
  });
});
