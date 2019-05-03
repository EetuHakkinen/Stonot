const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const config = require('./utils/config');
const booksRouter = require('./controllers/books');

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        console.log(`Connected to mongodb`);
    })
    .catch(e => {
        console.error(e);
    })

app.use(cors());
app.use(bodyParser.json());
app.use('/api/books', booksRouter);

module.exports = app;