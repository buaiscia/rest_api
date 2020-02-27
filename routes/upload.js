const express = require('express');
const router = express.Router();
const path = require('path');

const uploading = require('./uploading');
// const app = express();


router.get('/', (req, res) => {
    res.sendFile('upload.html', {
        root: path.join(__dirname, '../views/')
    });

})

router.post('/', uploading.post);


module.exports = router;
