import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoute from "./routes/taskRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(taskRoute);
app.listen(port, () => {
  console.log(`Server start at port:${port}`);
});
