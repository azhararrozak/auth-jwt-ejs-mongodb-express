const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

// Contoh rute yang membutuhkan otentikasi
router.get("/dashboard", ensureAuthenticated, userController.getDashboardPage);

module.exports = router;
