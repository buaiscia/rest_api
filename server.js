const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const app = express();


//  MONGODB SETUP

const url = process.env.DATABASEURL || 'mongodb://localhost:27017'

const dbName = 'moviesDB';

mongoose.connect(`${url}/${dbName}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection error');
    });

// CALL MODULES

app.use(express.json());

app.use(fileUpload());

//SETUP CORS

const allowedOrigins = ['http://localhost:3000',
                        'http://someotherproxy'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin'
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// SET ROUTES

const indexRoute = require('./routes/index');
const uploadFIle = require('./routes/upload');


// USE ROUTES

app.use('/', indexRoute);
app.use('/upload', uploadFIle);

app.get('*', function (req, res) {
    res.status(404).send('Page not found');
});


// SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));