import request from "supertest";
import { app } from "../app"; // Assuming you export your Express app in app.ts
import prisma from "../prisma"; // Make sure prisma is imported correctly

let server: any;

beforeAll(async () => {
  // You can set up a test database if needed
  server = app.listen(5000);
});

afterAll(async () => {
  // Clean up or close the database connection after tests
  await prisma.$disconnect();
  server.close();
});

describe("Admin Controller Tests", () => {
  it("should return a list of vendors", async () => {
    const response = await request(server)
      .get("/api/admin/vendors")
      .set("Authorization", "Bearer valid-token");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("length");
  });

  it.skip("should return 403 for non-admin access", async () => {
    const response = await request(server)
      .get("/api/admin/vendors")
      .set("Authorization", "Bearer invalid-token");
    expect(response.status).toBe(403);
  });

  it.skip("should toggle user status (activate/deactivate)", async () => {
    const user = await prisma.users.create({
      data: {
        name: "John",
        lastname: "Doe",
        phone: "123456789",
        email: "john@example.com",
        password: "password",
        role: "customer",
      },
    });

    const response = await request(server)
      .patch("/api/admin/users/status")
      .set("Authorization", "Bearer admin-token") // Make sure to use a valid token
      .send({ userId: user.id, status: true });

    expect(response.status).toBe(200);
    expect(response.body.is_verified).toBe(true);

    // Clean up
    await prisma.users.delete({ where: { id: user.id } });
  });
});
