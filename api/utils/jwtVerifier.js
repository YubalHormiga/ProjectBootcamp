const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {
    try {
        const { headers: { authorization } } = req

        const token = authorization.substring(7)

        const payload = jwt.verify(token, JWT_SECRET)

        const { sub: userId } = payload

        req.userId = userId

        next()
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}