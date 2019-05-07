const stockRouter = require('express').Router();
const Stock = require('../models/stock');
const getUser = require('../services/userService');

stockRouter.get('/', async (req, res, next) => {
    const user = await getUser(req, res, next);

    if (user) {
        return res.json(user.stocks);
    }
    return res.status(401);
});

module.exports = stockRouter;