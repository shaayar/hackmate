const express = require('express')
const app = express()
const connect = require('./config/db.connect')

connect()

app.use(express.json())


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})