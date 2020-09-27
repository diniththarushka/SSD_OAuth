const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    "380248093686-s9qasfrkbei55jjr0ful7qigesub1pv4.apps.googleusercontent.com",
    "Dz2GDhmRSwWgOXLYKOea3cCS",
    "http://localhost:4000/login/auth/callback"
);

module.exports = oauth2Client;