const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getUsersForSidebar } = require("../controllers/user.controllers");

const router = express.Router();

router.get("/", authMiddleware , getUsersForSidebar );


module.exports = router;