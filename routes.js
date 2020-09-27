const express = require('express');
const router = express.Router();

const loginRoute = require('./controller/login.controller');
const driveRoute = require('./controller/drive.controller');

router.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/core/auth_login.html');
});

router.use('/login', loginRoute);
router.use('/drive', driveRoute);

module.exports = router;