import jwt from "jsonwebtoken";

export const generateToken = (user: { id: number; role: string }) => {
  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h", // Token expires in 1 hour
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
