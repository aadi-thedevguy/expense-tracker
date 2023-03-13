const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization) {
        try {
            // get token from header
            token = req.headers.authorization
            // verify token
            const decoded = Number(jwt.verify(token, process.env.JWT_SECRET))

            // Get the user ID from the token payload
            const user = await User.findByPk(decoded.userId)
            req.user = user
            // console.log(user, req.user)
            next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No Token Available')
    }
}
module.exports = { protect }
