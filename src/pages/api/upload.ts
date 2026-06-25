import { verifyAuth } from "@lib/auth";
import formidable from "formidable";
import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function parseForm(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    maxFileSize: 10 * 1024 * 1024,
    keepExtensions: true,
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ success: false, error: "Upload is only available in development" });
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);
      const subfolder = (
        Array.isArray(fields.subfolder) ? fields.subfolder[0] : fields.subfolder
      ) || "general";
      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
      }

      const destDir = path.join(UPLOADS_DIR, subfolder);
      await fs.mkdir(destDir, { recursive: true });

      const ext = path.extname(file.originalFilename || "");
      const filename = `${Date.now()}${ext}`;
      const destPath = path.join(destDir, filename);

      await fs.copyFile(file.filepath, destPath);
      await fs.unlink(file.filepath);

      const publicPath = `/uploads/${subfolder}/${filename}`;
      return res.status(200).json({ success: true, data: { path: publicPath } });
    } catch {
      return res.status(500).json({ success: false, error: "Upload failed" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const chunks: Uint8Array[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const body = JSON.parse(Buffer.concat(chunks).toString());
      const filePath = body.path as string;

      if (!filePath || !filePath.startsWith("/uploads/")) {
        return res.status(400).json({ success: false, error: "Invalid path" });
      }

      const fullPath = path.join(process.cwd(), "public", filePath);
      await fs.unlink(fullPath);
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ success: false, error: "Delete failed" });
    }
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
