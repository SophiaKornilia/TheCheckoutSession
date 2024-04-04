const express = require('express')
const { getProducts } = require('./fetch.controllers')
const router = express.Router()

router.get("/getProducts", getProducts)

module.exports = router
