const Stock = require('../models/stock');
const User = require('../models/user');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

describe('handle stocklist', () => {
    /**Before each test empty database and create test user */
    beforeEach(async () => {
        await Stock.deleteMany({});
        await User.deleteMany({});
        await api.post('/api/users/').send({ username: 'eetuh', name: 'Eetu Häkkinen', password: 'hellurei123' });
    });

    test('set stocks', async () => {
        // login
        const currUser = await api.post('/api/login').send({ username: 'eetuh', password: 'hellurei123' });

        // create new stock to server
        const res = await api.post('/api/stock')
            .set('authorization', 'bearer ' + currUser.body.token)
            .send({ ticker: 'NOKIA', name: 'Nokia Oyj' })
            .expect(200);
        expect(res.body.ticker).toEqual('NOKIA');
        expect(res.body.name).toEqual('Nokia Oyj');
    });

    test('get stocks', async () => {
        // login
        const currUser = await api.post('/api/login').send({ username: 'eetuh', password: 'hellurei123' });

        // create new stock to server
        await api.post('/api/stock')
            .set('authorization', 'bearer ' + currUser.body.token)
            .send({ ticker: 'NOKIA', name: 'Nokia Oyj' })
            .expect(200);

        // get stocklist from server
        const res = await api.get('/api/stock')
                        .set('authorization', 'bearer ' + currUser.body.token)
                        .expect(200);
        expect(res.body[0].ticker).toEqual('NOKIA');
        expect(res.body[0].name).toEqual('Nokia Oyj');
    });
});

afterAll(() => {
    mongoose.connection.close();
})