import fs from "fs";

export function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log("File content:", data);
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
}
