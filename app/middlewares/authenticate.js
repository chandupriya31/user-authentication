const jwt = require('jsonwebtoken');

module.exports.authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const token_data = jwt.verify(token, process.env.jwt_secret);
        req.user = token_data;
        next();
    } catch (error) {
        res.status(500).json({ msg: 'Somethimg went wrong... please try again later' })
    }
}