const Joi = require('@hapi/joi');
const express = require('express');

const app = express();

app.use(express.json());

const indexRoute = require("./routes/index");


app.use('/', indexRoute)






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));