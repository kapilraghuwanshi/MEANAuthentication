const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');

var userController = require('./controllers/userController');

const app = express();
const port = 5555;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8100' }));

app.listen(port, () => console.log(`Server started at port ${port} !!`));

app.use('/users', userController);