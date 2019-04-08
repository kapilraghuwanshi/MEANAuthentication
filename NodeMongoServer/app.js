require('./config/config');
require('./models/database');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const routesIndex = require('./routes/index.router');

var app = express(); // create an express object - top level express funtion

// middleware functions(app.use or app.getpostput) - functions have access/modify/end/next req-resp objects
app.use(bodyParser.json());
app.use(cors()); // third-party middleware
app.use(passport.initialize());
app.use('/api', routesIndex); // routing level middleware 

// error handeling middleware functions with 4 parameters instead of 3
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`MongoNode Server started at port : ${process.env.PORT}!!`));
