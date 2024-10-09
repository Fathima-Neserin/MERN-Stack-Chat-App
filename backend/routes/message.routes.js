const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { sendMessage , getMessages } = require("../controllers/message.controllers");

const router = express.Router();

router.get( "/:id", authMiddleware , getMessages )
router.post( "/send/:id" , authMiddleware , sendMessage );

module.exports = router;