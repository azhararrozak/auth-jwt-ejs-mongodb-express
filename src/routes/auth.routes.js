const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { redirectIfAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/register",
  redirectIfAuthenticated,
  authController.getRegisterPage
);
router.post("/register", authController.postRegister);
router.get("/login", redirectIfAuthenticated, authController.getLoginPage);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

module.exports = router;
