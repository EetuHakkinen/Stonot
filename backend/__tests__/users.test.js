const User = require('../models/user');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

describe('creating user', () => {
    // delete users from database and create test user before each test
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({ username: 'rootuser', name: 'root-user', passwordHash: 'password' });
        await user.save();
    });

    test('creation succeeds', async () => {
        const usersBeginning = await User.find({});

        const newUser = {
            username: 'eetuh',
            name: 'Eetu Häkkinen',
            password: 'eetunpw'
        }

        await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

        // new user should be added to database
        const usersEnd = await User.find({});
        expect(usersEnd.length).toBe(usersBeginning.length + 1);

        // new user's name could be find in database
        const usernames = usersEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('do not create user with existing username', async () => {
        const usersBeginning = await User.find({});

        const newUser = {
            username: 'root',
            name: 'Eetu',
            password: 'eetunpw'
        }

        const res = await api
                            .post('/api/users')
                            .send(newUser);

        // server should not respond with OK
        expect(res.status).not.toBe(200);
        
        // new user should not be added to database
        const usersEnd = await User.find({});
        expect(usersEnd.length).toBe(usersBeginning.length);

        // new user could not be found in database
        const names = usersEnd.map(u => u.name);
        // previous users should be fine
        expect(names).toContain('root-user');
        expect(names).not.toContain('Eetu');
    });

    test('Do not add user without username', async () => {
        const usersBeginning = await User.find({});

        const newUser = {
            name: 'Eetu H',
            password: 'passw'
        }

        const res = await api.post('/api/users').send(newUser);
        
        // server should not respond with OK
        expect(res.status).not.toBe(200);

        // newUser should not be added to database
        const usersEnd = await User.find({});
        expect(usersEnd.length).toBe(usersBeginning.length);

        // newUser could not be found in database
        const names = usersEnd.map(u => u.name);
        // previous users should be fine
        expect(names).toContain('root-user');
        expect(names).not.toContain('Eetu H');
    });

    test('Do not add user without name', async () => {
        const usersBeginning = await User.find({});

        const newUser = {
            username: 'eetuhak',
            password: 'passw'
        }

        const res = await api.post('/api/users').send(newUser);
        
        // server should not respond with OK
        expect(res.status).not.toBe(200);

        // newUser should not be added to database
        const usersEnd = await User.find({});
        expect(usersEnd.length).toBe(usersBeginning.length);

        // newUser could not be found in database
        const names = usersEnd.map(u => u.username);
        // previous users should be fine
        expect(names).toContain('rootuser');
        expect(names).not.toContain('eetuhak');
    });

    test('Do not add user without password', async () => {
        const usersBeginning = await User.find({});

        const newUser = {
            name: 'Eetu Hak',
            username: 'eetuhakkinen'
        }

        const res = await api.post('/api/users').send(newUser);
        
        // server should not respond with OK
        expect(res.status).not.toBe(200);

        // newUser should not be added to database
        const usersEnd = await User.find({});
        expect(usersEnd.length).toBe(usersBeginning.length);

        // newUser could not be found in database
        const names = usersEnd.map(u => u.name);
        // previous users should be fine
        expect(names).toContain('root-user');
        expect(names).not.toContain('eetuhakkinen');
    });

    test('Password must have at least 6 chars', async () => {
        const usersBeginning = await User.find({});

        const newUser = {
            name: 'Eetu Hak',
            username: 'eetuhakkinen',
            password: 'moi'
        }

        const res = await api.post('/api/users').send(newUser);
        
        // server should not respond with OK
        expect(res.status).not.toBe(200);

        // newUser should not be added to database
        const usersEnd = await User.find({});
        expect(usersEnd.length).toBe(usersBeginning.length);

        // newUser could not be found in database
        const names = usersEnd.map(u => u.name);
        // previous users should be fine
        expect(names).toContain('root-user');
        expect(names).not.toContain('eetuhakkinen');
    });

    test('Username must have at least 5 chars', async () => {
        const usersBeginning = await User.find({});

        const newUser = {
            name: 'Eetu Hak',
            username: 'ee',
            password: 'moikkelis'
        }

        const res = await api.post('/api/users').send(newUser);
        
        // server should not respond with OK
        expect(res.status).not.toBe(200);

        // newUser should not be added to database
        const usersEnd = await User.find({});
        expect(usersEnd.length).toBe(usersBeginning.length);

        // newUser could not be found in database
        const names = usersEnd.map(u => u.name);
        // previous users should be fine
        expect(names).toContain('root-user');
        expect(names).not.toContain('eetuhakkinen');
    });
});

afterAll(() => {
    mongoose.connection.close();
})