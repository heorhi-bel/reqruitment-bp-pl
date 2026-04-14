import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { testConnection } from "./utils/database.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Interview task" });
});

app.use("/messages", messageRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ success: false, message, data });
});

testConnection()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });