import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function getFileInfo() {
  const filePath = path.join(__dirname, "data", "example.txt");

  if (fs.existsSync(filePath)) {
    console.log("✅ File exists.");
    const stats = fs.statSync(filePath);
    console.log(`📏 File Size: ${stats.size} bytes`);
    console.log(`📅 Created At: ${stats.birthtime}`);
  } else {
    console.log("❌ File does not exist.");
  }
}
