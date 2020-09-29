const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const busboy = require('connect-busboy');
const session = require('express-session');
const routing = require('./routes');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(busboy());
app.use('/', routing);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/core'));
app.use(
    session({
        secret: 'secret123',    //sample secret code
        resave: true,
        saveUninitialized: true
    })
);
app.listen(PORT, (err) => {
    if (err)
        console.log(`Error starting server: ${err}`);
    else
        console.log(`Server is up and running in port: ${PORT}`);
})