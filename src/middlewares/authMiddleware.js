const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/user.model"); // Pastikan path ini sesuai dengan struktur proyek Anda

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token"); // Atau dari cookie, tergantung implementasi

  // Check if not token
  if (!token) {
    // Jika request berasal dari web (dengan EJS), kita bisa redirect atau render halaman error
    if (req.originalUrl.startsWith("/api")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    } else {
      req.flash("error", "Silakan login untuk mengakses halaman ini.");
      return res.redirect("/auth/login");
    }
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    if (req.originalUrl.startsWith("/api")) {
      return res.status(401).json({ msg: "Token is not valid" });
    } else {
      req.flash(
        "error",
        "Token tidak valid atau kadaluarsa. Silakan login kembali."
      );
      return res.redirect("/auth/login");
    }
  }
};

const ensureAuthenticated = (req, res, next) => {
  // Check if user is authenticated (from JWT token)
  // This is a basic check; for production, you'd want to verify the token more robustly
  // For now, let's assume if req.user exists, they are authenticated
  if (req.user) {
    return next();
  }
  req.flash("error", "Silakan login untuk mengakses halaman ini.");
  res.redirect("/auth/login");
};

const redirectIfAuthenticated = (req, res, next) => {
  if (req.user) {
    // Assuming req.user is set after a successful login (via JWT)
    return res.redirect("/dashboard"); // Or wherever authenticated users should go
  }
  next();
};

module.exports = {
  authMiddleware,
  ensureAuthenticated,
  redirectIfAuthenticated,
};
