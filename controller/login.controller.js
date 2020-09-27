const express = require('express');
const {google} = require('googleapis');
const path = require('path');
const router = express.Router();

const oauth2Client = require('./auth');

router.get('/auth', (req, res) => {
    let URL = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: ["https://www.googleapis.com/auth/drive"]
    });
    res.status(200).redirect(URL);
});

router.get('/auth/callback',
    function (req, res) {
        oauth2Client.getToken(req.query.code).then((code) => {
            //console.log(code);
        }).catch((err) => {
            //console.log(err);
        })
        // Successful authentication, redirect success.
        res.sendFile(path.join(__dirname + '/../core/landing.html'));
    });

module.exports = router;