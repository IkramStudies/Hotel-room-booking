require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// Import your configurations and routes
const connectDB = require("./config/db");
require("./config/passport"); // This executes your Google Strategy logic
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

// 1. Database Connection
connectDB();

// 2. Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your React/Vite frontend
    credentials: true,
  }),
);

// 3. Session Configuration (Required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "stayease_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// 4. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/admin", adminRoutes); // Protected routes for the Admin View

// 6. Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
