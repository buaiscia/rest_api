const express = require('express');
const router = express.Router();

const fileUpload = require('express-fileupload');

app.use(fileUpload());

router.get('/upload', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
});