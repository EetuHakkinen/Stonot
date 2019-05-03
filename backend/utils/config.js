require('dotenv').config();
let MONGODB_URL = '';
if (process.env.NODE_ENV === 'test') {
    MONGODB_URL = process.env.TEST_MONGODB_URL;
} else {
    MONGODB_URL= process.env.MONGODB_URL;
}

let PORT = process.env.PORT;


module.exports = {
    PORT,
    MONGODB_URL
}