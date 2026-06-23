import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const COOKIE_NAME = "admin_session";

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "fallback-dev-secret-change-me";
}

function sign(token: string): string {
  return crypto.createHmac("sha256", getSecret()).update(token).digest("hex");
}

export function createSession(res: NextApiResponse): void {
  const token = crypto.randomUUID();
  const signature = sign(token);
  const value = `${token}.${signature}`;

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${value}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
}

export function clearSession(res: NextApiResponse): void {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
  );
}

export function verifyAuth(req: NextApiRequest): boolean {
  const cookies = req.headers.cookie || "";
  const match = cookies
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!match) return false;

  const value = match.split("=")[1];
  const dotIndex = value.lastIndexOf(".");
  if (dotIndex === -1) return false;

  const token = value.substring(0, dotIndex);
  const providedSig = value.substring(dotIndex + 1);
  const expectedSig = sign(token);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(providedSig, "hex"),
      Buffer.from(expectedSig, "hex")
    );
  } catch {
    return false;
  }
}
