const Stock = require('../models/stock');
const User = require('../models/user');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

describe('handle stocklist', async () => {
    /**Before each test empty database and create test user */
    beforeEach(async () => {
        await Stock.deleteMany({});
        await User.deleteMany({});
        await api.post('/api/users/').send({ username: 'eetuh', name: 'Eetu Häkkinen', password: 'hellurei123'});
    });

    test('get stocks', async () => {
        const stock = await new Stock({ticker: 'NOKIA', name: 'Nokia Oyj'}).save();
        const usr = await api.post('/api/login').send({ username: 'eetuh', password: 'hellurei123'});
        const user = await User.find({username: 'eetuh'});
        user.stocks.concat(stock._id);
        await user.save();
        const res = await api.get('/api/stock').set('authorization', 'bearer ' + usr.body.token).expect(200);

        expect(res.body[0].name).toEquals('Nokia Oyj');
        expect(res.body[0].ticker).toEquals('NOKIA');
    });
});

afterAll(() => {
    mongoose.connection.close();
})