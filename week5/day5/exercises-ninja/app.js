import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});