const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const logger = require('morgan');




const app = express();

app.use(express.static(__dirname + '/view'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

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

//SETUP CORS

// const allowedOrigins = ['http://localhost:3000',
//     'http://someotherproxy'];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);
//         // if (allowedOrigins.indexOf(origin) === -1) {
//         //     const msg = 'The CORS policy for this site does not allow access from the specified origin'
//         //     return callback(new Error(msg), false);
//         // }
//         return callback(null, true);
//     }
// }));

app.use((req, res, next) => {
    allowed = '*'
    res.header('Access-Control-Allow-Origin', allowed);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({})
    }
    next();
})


app.use(express.static(__dirname + "/api/public"));

// SET ROUTES

const indexRoute = require("./api/routes/index");
const uploadRoute = require('./api/routes/upload')


// USE ROUTES


app.use('/upload', uploadRoute)

app.use('/', indexRoute)

// app.get('*', function (req, res) {
//     res.status(404).send('Page not found');
// });

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    })
})


// SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));