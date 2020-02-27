const express = require('express');
const router = express.Router();
const formidable = require('formidable')
const path = require('path');

const app = express();





router.get('/', (req, res) => {
    res.sendFile('upload.html', {
        root : path.join(__dirname, '../views/')
    })
  
})

router.post('/', (req, res, next) => {

    const form = formidable({ multiples: true });
 
    form.parse(req, (err, fields, files) => {
        console.log(fields);
      console.log(files);
      
      if (err) {
        next(err);
        return;
      }
      res.json({ fields, files });
      
      
    });
    
})


module.exports = router;
