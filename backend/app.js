const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
var mongoUrl = '';
if (process.env.NODE_ENV === 'test') {
    mongoUrl = process.env.TEST_MONGODB_URL;
} else {
    mongoUrl = process.env.MONGODB_URL;
}
const config = require('./utils/config');
const booksRouter = require('./controllers/books');
const usersRouter = require('./controllers/users');

mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        console.log(`Connected to mongodb`);
    })
    .catch(e => {
        console.error(e);
    })

app.use(cors());
app.use(bodyParser.json());
app.use('/api/books/', booksRouter);
app.use('/api/users/', usersRouter);

module.exports = app;