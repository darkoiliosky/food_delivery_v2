import { createUser, updateUserStatus } from "../services/userService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe.skip("User Service Tests", () => {
  it("should create a new user", async () => {
    const user = await createUser(
      "John",
      "Doe",
      "john@example.com",
      "1234567890",
      "password",
      "customer"
    );

    expect(user).toHaveProperty("email", "john@example.com");
    expect(user).toHaveProperty("role", "customer");

    // Clean up
    await prisma.users.delete({ where: { id: user.id } });
  });

  it("should update user status", async () => {
    const user = await prisma.users.create({
      data: {
        name: "Jane",
        lastname: "Doe",
        phone: "0987654321",
        email: "jane@example.com",
        password: "password",
        role: "customer",
      },
    });

    const updatedUser = await updateUserStatus(user.id, true);

    expect(updatedUser.is_verified).toBe(true);

    // Clean up
    await prisma.users.delete({ where: { id: user.id } });
  });
});
