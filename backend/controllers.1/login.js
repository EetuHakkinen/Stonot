const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

/**Handles user login request */
loginRouter.post('/', async (req, res) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username });

    // check if password is correct
    const passwordStatus = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordStatus)) {
        // if password is not correct, response with unauthorized
        return res.status(401).json({ error: 'Username or password is not correct' })
    }

    // generate user token
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET);

    // if login success, response with token and basic user data
    res
        .status(200)
        .send({ token, username: user.username, name: user.name });
})

module.exports = loginRouter;