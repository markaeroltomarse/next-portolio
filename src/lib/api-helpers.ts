import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "public", "data");

export async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function readJsonFileSync<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  const raw = require("fs").readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
