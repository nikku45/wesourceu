import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import checkRoute from "./route/checkRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", checkRoute);

const PORT = 5000;
app.listen(PORT, () => console.log("Backend running on port", PORT));
