import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
}

export function CreateToken(payload: JwtPayload): string {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

}
