const express = require('express')
const { register, login, isLoggedIn, logout } = require('./auth.controllers')
const router = express.Router()
const {loggedIn} = require("../../middlewares/loggedIn");

router.post("/register", register)
router.post("/login", login)
router.get("/isLoggedIn", isLoggedIn)
router.post("/logout", logout)

module.exports = router

