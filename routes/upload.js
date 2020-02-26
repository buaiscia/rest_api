const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

const fileUpload = require('express-fileupload');

app.use(fileUpload());

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'upload.html'));
});

module.exports = router;