require("dotenv").config();
const jwt = require("jsonwebtoken")

const fetchUser = (req, res, next) => {
    const token = req.headers['auth-token']

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json('Forbidden')
        }
        try {
            req.user = user.user;
            next();
        }
        catch (err) {
            return res.status(500).json("Internal Server Error")
        }
    })
}

module.exports = fetchUser