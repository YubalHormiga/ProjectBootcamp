const {
    errors: { FormatError, LengthError, NotFoundError, AuthError },
    regex: { IS_EMAIL_REGEX, HAS_SPACES_REGEX }
} = require('com')
const { User } = require('../models')

/**
 * Authenticates a user
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 */
function authenticateUser(email, password) {
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new FormatError('email is not valid')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.length < 8) throw new LengthError('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new FormatError('password has spaces')

    return User.findOne({ email })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not registered')

            if (user.password !== password)
                throw new AuthError('wrong password')

            return user.id
        })
}

module.exports = authenticateUser