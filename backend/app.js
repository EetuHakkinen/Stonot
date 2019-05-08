const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
var mongoUrl = '';
// select database based on node environment
if (process.env.NODE_ENV === 'test') {
    mongoUrl = process.env.TEST_MONGODB_URL;
} else {
    mongoUrl = process.env.MONGODB_URL;
}
const config = require('./utils/config');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const stockRouter = require('./controllers/stock');
const pushRouter = require('./controllers/push');

// connect backend to mongodb
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        console.log(`Connected to mongodb`);
    })
    .catch(e => {
        console.error(e);
    })

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));
app.use('/api/login/', loginRouter);
app.use('/api/users/', usersRouter);
app.use('/api/stock/', stockRouter);
app.use('/api/push/', pushRouter);

module.exports = app;