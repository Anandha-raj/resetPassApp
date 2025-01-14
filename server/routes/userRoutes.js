const express = require("express");
const {registerUser, changePassword, resetPassword} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.patch("/changePassword", changePassword);
router.patch("/resetPassword", resetPassword);

module.exports = router;