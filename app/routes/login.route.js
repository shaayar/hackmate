'use strict'

const express = require('express');
const router = express.Router();
const jwtVerifier = require('../middleware/authorization')


module.exports = (app) => {
    const loginController = require('../controllers/login.controller');
    router.post('/Registration', loginController.registration);
    router.post('/verify', loginController.verifyUser);
    app.use('/api/logins', router)
}