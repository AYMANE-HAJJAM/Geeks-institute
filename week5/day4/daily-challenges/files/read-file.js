import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readFileContent() {
  const filePath = path.join(__dirname, "file-data.txt");

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log("File Content:");
    console.log(data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

export default readFileContent;
