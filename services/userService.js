const User = require('../models/user');
const jwt = require('jsonwebtoken');

/** Check user authentication status and return user if authorizated*/
const getUser = async (req, res, next) => {
    const auth = req.get('authorization');
    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        // check token
        const token = auth.substring(7);
        try {
            const decToken = jwt.verify(token, process.env.SECRET);
            if (!token || !decToken.id) {
                res.status(401).send();
                return null;
            }
            return await User.findById(decToken.id).populate('stocks');
        } catch (e) {
            next(e);
            return null;
        }
    }
    res.status(401).send();
    return null
}

module.exports = getUser;