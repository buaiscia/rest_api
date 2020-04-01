const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openapi.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));


// CONFIGURATION

app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + "/api/public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

//  MONGODB SETUP

const url = process.env.DATABASEURL || "mongodb://localhost:27017";
const dbName = "moviesDB";

mongoose
    .connect(`${url}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database connection successful");
    })
    .catch(err => {
        console.error("Database connection error");
    });

//SETUP HEADERS

app.use((req, res, next) => {
    const allowed = "*";
    res.header("Access-Control-Allow-Origin", allowed);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

// SET ROUTES

const indexRoute = require("./api/routes/index");
const uploadRoute = require("./api/routes/upload");

// USE ROUTES

app.use("/upload", uploadRoute);
app.use("/", indexRoute);

//ERROR/404 ROUTES

app.use((req, res, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
});

// SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
