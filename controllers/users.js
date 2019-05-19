const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

/**Handles user creation */
usersRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body;

        if (body.password.length > 5) {
            const passwordHash = await bcrypt.hash(body.password, 10);

            // create user by body data
            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash
            });

            // response with created user data
            const savedUser = await user.save();
            res.json(savedUser.toJSON());
        } else {
            res.status(500).send({ message: 'Password must have at least 6 characters' })
        }
    } catch (e) {
        next(e);
    }
});



module.exports = usersRouter;