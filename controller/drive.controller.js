const express = require('express');
const {google} = require('googleapis');
const router = express.Router();

const oauth2Client = require('./auth')

var access_token = "";
var refresh_token = "";

var drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

// assign tokens based on token set event
oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        refresh_token = tokens.refresh_token;
    }
    access_token = tokens.access_token;

    oauth2Client.credentials = {
        access_token: tokens.access_token
    };
});

// Endpoint for file uploads
router.post('/upload', (req, res) => {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        drive.files.create({
            requestBody: {
                name: filename,
                mimeType: mimetype
            },
            media: {
                mimeType: mimetype,
                body: file
            }
        }).then(() => {
            res.status(200).json({status: 'success', message: 'File is uploaded to the Drive'});
        }).catch((err) => {
            console.log(err);
            res.status(500).json({status: 'failed', message: err});
        })
    });
});

module.exports = router;