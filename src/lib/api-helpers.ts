import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

function getDataDir() {
  return path.join(process.cwd(), "public", "data");
}

export async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(getDataDir(), `${filename}.json`);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const dir = getDataDir();
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${filename}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function readJsonFileSync<T>(filename: string): T {
  const filePath = path.join(getDataDir(), `${filename}.json`);
  const raw = fsSync.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
