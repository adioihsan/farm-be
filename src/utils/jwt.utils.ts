import jwt from "jsonwebtoken";

interface JwtPayload {
  user: {
    id: string;
    email: string;
  }
}

export function createToken(payload: JwtPayload): string {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Server misconfigured");
  }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
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
