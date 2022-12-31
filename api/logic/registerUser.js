const {
    errors: { FormatError, LengthError, ConflictError, UnexpectedError },
    regex: { IS_EMAIL_REGEX, HAS_SPACES_REGEX, IS_ALPHABETICAL_REGEX }
} = require('com')
const { User } = require('../models')

function registerUser(name, email, password) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (!IS_ALPHABETICAL_REGEX.test(name)) throw new FormatError('name is not alphabetical')
    if (name.length < 1) throw new LengthError('name length is less than 1')

    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new FormatError('email is not valid')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.length < 8) throw new LengthError('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new FormatError('password has spaces')

    return User.create({ name, email, password })
        .catch(error => {
            if (error.message.includes('E11000'))
                throw new ConflictError(`user with email ${email} already exists`)

            throw new UnexpectedError(error.message)
        })
}

module.exports = registerUser