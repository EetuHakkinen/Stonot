const User = require('../models/user');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

describe('login', () => {
    // before each test clear database and create new user
    beforeEach(async () => {
        await User.deleteMany({});
        const newUser = {
            username: 'eetuh',
            name: 'Eetu Häkkinen',
            password: 'helloWorldMoi124'
        }
        await api.post('/api/users/').send(newUser);
    });

    test('Real user can log in', async () => {
        const user = {
            username: 'eetuh',
            name: 'Eetu Häkkinen',
            password: 'helloWorldMoi124'
        }

        const res = await api
                            .post('/api/login/')
                            .send(user)
                            .expect(200);

        // token should exist
        expect(res.body.token).not.toBe(undefined);
        // username and name should exist
        expect(res.body.username).toBe('eetuh');
        expect(res.body.name).toBe('Eetu Häkkinen');
    });

    test('User can not log in with wrong password', async () => {
        const user = {
            username: 'eetuh',
            name: 'Eetu Häkkinen',
            password: 'helloWorldMoi'
        }

        const res = await api.post('/api/login').send(user).expect(401);

        // token should not exist
        expect(res.body.token).toBe(undefined);
        expect(res.body.error).toBe('Username or password is not correct');
    });

    test('User not found / username is not correct', async () => {
        const user = {
            username: 'etuh',
            name: 'Eetu Häkkinen',
            password: 'helloWorldMoi124'
        }

        const res = await api.post('/api/login/').send(user).expect(401);

        // token should not exist
        expect(res.body.token).toBe(undefined);
        expect(res.body.error).toBe('Username or password is not correct');
    });
});

// after all tests close mongodb connection
afterAll(() => { mongoose.connection.close() });