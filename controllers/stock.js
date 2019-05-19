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

stockRouter.post('/', async (req, res, next) => {
    // get user by token
    const user = await getUser(req, res, next);
    
    // create stock and save to database
    const newStock = new Stock({...req.body});
    const stock = await newStock.save();
    user.stocks.push(stock._id);
    await user.save();
    res.status(200).send(stock.toJSON());
});

stockRouter.delete('/:id', async (req, res, next) => {
    var id = req.params.id;

    // get user by token
    const user = await getUser(req, res, next);
    // remove stock from user stocks
    const stocks = user.stocks.filter((s) => s.id !== id);
    user.stocks = stocks;
    await user.save();
    res.status(201).send({ message: 'deleted successfully' });
});

module.exports = stockRouter;