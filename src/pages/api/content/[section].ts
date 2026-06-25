import { readJsonFile, writeJsonFile } from "@lib/api-helpers";
import { verifyAuth } from "@lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const ALLOWED_SECTIONS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "socials",
  "settings",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { section } = req.query;

  if (typeof section !== "string" || !ALLOWED_SECTIONS.includes(section)) {
    return res.status(400).json({ success: false, error: "Invalid section" });
  }

  if (req.method === "GET") {
    try {
      const data = await readJsonFile(section);
      return res.status(200).json({ success: true, data });
    } catch {
      return res.status(500).json({ success: false, error: "Failed to read data" });
    }
  }

  if (req.method === "PUT") {
    if (process.env.NODE_ENV !== "development") {
      return res.status(403).json({ success: false, error: "Write operations are only available in development" });
    }

    if (!verifyAuth(req)) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    try {
      await writeJsonFile(section, req.body);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(`Failed to write ${section}:`, err);
      return res.status(500).json({
        success: false,
        error: "Failed to write data",
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
