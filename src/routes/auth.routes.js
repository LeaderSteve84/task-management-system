const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const { validateUser } = require("../middleware/validators/userValidator");

const router = express.Router();

router.post("/register", validateUser, register);
router.post("/login", login);

module.exports = router;
