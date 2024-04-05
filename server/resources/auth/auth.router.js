const express = require('express')
const { register, login, isLoggedIn } = require('./auth.controllers')
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/isLoggedIn", isLoggedIn)

module.exports = router