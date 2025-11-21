import jwt from "jsonwebtoken";
import crypto from "crypto";


interface JwtPayload {
  user: {
    id: string;
    email: string;
    name: string;
  }
}

export function createToken(payload: JwtPayload): string {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Server misconfigured");
  }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });
}

export function validateToken(jwtToken: string): JwtPayload {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Server misconfigured");
  }
  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY) as JwtPayload
    return payload
  } catch (error) {
    throw new Error("Invalid or Expired Token")
  }
}

export function generateRefreshToken(): { raw: string, hashed: string, expiration: Date } {
  const raw = crypto.randomBytes(64).toString("hex");
  const hashed = hashRefreshToken(raw)
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7)
  return { raw, hashed,expiration }
}

export function hashRefreshToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
