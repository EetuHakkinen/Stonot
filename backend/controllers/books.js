const booksRouter = require('express').Router();

booksRouter.get('/', (req, res) => {
    res.send('<h1>HelloWorld!</h1>');
});

module.exports = booksRouter;