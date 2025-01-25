const express = require("express")
const {CreateUser} = require("../controller/userController")

const router = express.Router()

router.post("/signup", CreateUser)

module.exports = router