import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import contactsRouter from "./routes/contactsRouter.js";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./envs/production.env"
      : "./envs/development.env",
});

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// app.use(morgan("tiny"));

app.use(express.json());
app.use(cors());

// Global custom middeware
app.use((req, res, next) => {
  req.time = new Date().toLocaleString("ua-UA");
  next();
});

// Routes ===========================================================
const pathPrefix = "/api/contacts";
app.use(`${pathPrefix}`, contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle not found error
app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Oops! Resource not found!",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(`Error: ${err.message}`);

  res.status(err.status ?? 500).json({
    msg: err.message,
  });
});

// Server init ==================================================
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
