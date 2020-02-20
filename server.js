const Joi = require('@hapi/joi');
const express = require('express');

const app = express();

app.use(express.json());


// SET ROUTES
const indexRoute = require("./routes/index");

// USE ROUTES

app.use('/', indexRoute)


app.get('*', function(req, res) {
    res.status(404).send('Page not found');
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));