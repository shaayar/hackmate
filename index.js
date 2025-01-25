const express = require('express')
const app = express()
const connect = require('./config/db.connect')
const userRoutes = require("./routes/userRoutes")

connect()

app.use(express.json())
app.use(userRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})