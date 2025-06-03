require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./src/config/db"); // Import database connection
const path = require("path");
const cookieParser = require("cookie-parser"); // Untuk membaca cookie
const flash = require("connect-flash"); // Untuk pesan flash
const session = require("express-session"); // Untuk session (diperlukan flash)

const app = express();

// Connect to Database
connectDB();

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Bodyparser Middleware
app.use(express.json()); // Untuk parse application/json
app.use(express.urlencoded({ extended: false })); // Untuk parse application/x-www-form-urlencoded

// Cookie Parser
app.use(cookieParser());

// Express Session Middleware (needed for connect-flash)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "a_very_secret_session_key", // Ganti dengan secret yang kuat
    resave: true,
    saveUninitialized: true,
  })
);

// Connect Flash Middleware
app.use(flash());

// Global Variables for Flash Messages and User
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  // Check if user is logged in (from JWT token in cookie)
  const token = req.cookies.token;
  if (token) {
    try {
      const jwt = require("jsonwebtoken");
      const keys = require("./config/keys");
      const decoded = jwt.verify(token, keys.jwtSecret);
      res.locals.user = decoded.user;
      req.user = decoded.user; // Set req.user for middleware access
    } catch (err) {
      console.error("Error decoding token:", err.message);
      res.clearCookie("token"); // Clear invalid token
      res.locals.user = null;
      req.user = null;
    }
  } else {
    res.locals.user = null;
    req.user = null;
  }
  next();
});

// Routes
app.use("/", require("./src/routes/home.routes"));
app.use("/auth", require("./src/routes/auth.routes"));
app.use("/", require("./src/routes/user.routes")); // Contoh untuk rute yang diautentikasi

// Error Handling (Optional: for 404 or specific errors)
app.use((req, res, next) => {
  res
    .status(404)
    .render("error/404", {
      pageTitle: "Halaman Tidak Ditemukan",
      layout: "layouts/main",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
