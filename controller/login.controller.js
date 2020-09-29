const express = require('express');
const path = require('path');
const router = express.Router();

const oauth2Client = require('./auth');

//Endpoint for oAuth login
router.get('/auth', (req, res) => {
    let URL = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        // As we only need the drive scope
        scope: ["https://www.googleapis.com/auth/drive"]
    });
    res.status(200).redirect(URL);
});

// Successful authentication
router.get('/auth/callback',
    function (req, res) {
        oauth2Client.getToken(req.query.code).then((code) => {
            res.sendFile(path.join(__dirname + '/../core/landing.html'));
        }).catch((err) => {
            console.log(err);
            res.sendFile(path.join(__dirname + '/../core/auth_login.html'));
        });
    });

module.exports = router;