const User = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.getRegisterPage = (req, res) => {
  res.render("auth/register", {
    pageTitle: "Daftar",
    errors: req.flash("errors"),
  });
};

exports.postRegister = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Mohon isi semua kolom" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Password tidak cocok" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password harus minimal 6 karakter" });
  }

  if (errors.length > 0) {
    req.flash("errors", errors);
    return res.redirect("/auth/register");
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: "Email sudah terdaftar" });
      req.flash("errors", errors);
      return res.redirect("/auth/register");
    }

    user = await User.findOne({ username });
    if (user) {
      errors.push({ msg: "Username sudah terdaftar" });
      req.flash("errors", errors);
      return res.redirect("/auth/register");
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();

    req.flash("success_msg", "Anda berhasil mendaftar, silakan login");
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err.message);
    errors.push({ msg: "Terjadi kesalahan server" });
    req.flash("errors", errors);
    res.redirect("/auth/register");
  }
};

exports.getLoginPage = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    errors: req.flash("errors"),
    success_msg: req.flash("success_msg"),
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  // Check required fields
  if (!email || !password) {
    errors.push({ msg: "Mohon isi semua kolom" });
  }

  if (errors.length > 0) {
    req.flash("errors", errors);
    return res.redirect("/auth/login");
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      errors.push({ msg: "Email atau password salah" });
      req.flash("errors", errors);
      return res.redirect("/auth/login");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      errors.push({ msg: "Email atau password salah" });
      req.flash("errors", errors);
      return res.redirect("/auth/login");
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: "1h" }, // Token akan kadaluarsa dalam 1 jam
      (err, token) => {
        if (err) throw err;
        // Simpan token di cookie atau localStorage (untuk aplikasi web)
        // Untuk demo ini, kita akan redirect dan berharap client menyimpan token
        // Di aplikasi nyata, Anda bisa mengirim token dalam JSON response untuk API
        // atau set cookie di sini.
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        req.flash("success_msg", "Login berhasil!");
        res.redirect("/dashboard"); // Atau halaman lain setelah login
      }
    );
  } catch (err) {
    console.error(err.message);
    errors.push({ msg: "Terjadi kesalahan server" });
    req.flash("errors", errors);
    res.redirect("/auth/login");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token"); // Hapus cookie token
  req.flash("success_msg", "Anda telah logout.");
  res.redirect("/auth/login");
};
