import { verifyAuth } from "@lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const authenticated = verifyAuth(req);
  return res.status(authenticated ? 200 : 401).json({
    success: authenticated,
  });
}
