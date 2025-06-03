const User = require("../models/user.model");

exports.getDashboardPage = async (req, res) => {
  try {
    // req.user akan diisi oleh authMiddleware jika token valid
    const user = await User.findById(req.user.id).select("-password");
    res.render("users/profile", {
      pageTitle: "Dashboard Pengguna",
      user: user,
      success_msg: req.flash("success_msg"),
    });
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Tidak dapat memuat data pengguna.");
    res.redirect("/auth/login");
  }
};
