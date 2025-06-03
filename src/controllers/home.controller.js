exports.getIndexPage = (req, res) => {
  res.render("home/index", {
    pageTitle: "Beranda",
    user: req.user, // Jika ada user yang login (dari JWT)
  });
};
