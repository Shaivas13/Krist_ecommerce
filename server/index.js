import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import ProductRoutes from "./routes/Products.js";

dotenv.config();

const app = express();

// ✅ Allow frontend (React app) to access backend
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Basic test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Shaivee" });
});

// ✅ Routes
app.use("/api/user/", UserRouter);
app.use("/api/products/", ProductRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ success: false, status, message });
});

// ✅ Connect to MongoDB
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MONGO DB"))
    .catch((err) => {
      console.error("❌ Failed to connect with Mongo");
      console.error(err);
    });
};

// ✅ Start the server safely
const PORT = process.env.PORT || 8080;
const startServer = async () => {
  try {
    connectDB();

    const server = app.listen(PORT, () =>
      console.log(`🚀 Server started on port ${PORT}`)
    );

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`⚠️ Port ${PORT} in use. Trying ${PORT + 1}...`);
        app.listen(PORT + 1, () =>
          console.log(`🚀 Server started on port ${PORT + 1}`)
        );
      } else {
        console.error("Server error:", err);
      }
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
