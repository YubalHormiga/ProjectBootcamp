import { regex, errors } from 'com'

const { IS_EMAIL_REGEX, HAS_SPACES_REGEX, IS_ALPHABETICAL_REGEX } = regex

const { FormatError, LengthError, ConflictError, UnexpectedError } = errors

/**
 * Registers a user
 * @param {string} name The user name 
 * @param {string} email The user email
 * @param {string} password The user password
 */
export default function registerUser(name, email, password) {
    if (typeof name !== 'string') throw new Error('name is not a string')
    if (!IS_ALPHABETICAL_REGEX.test(name)) throw new Error('name is not alphabetical')
    if (name.length < 1) throw new LengthError('name length is less than 1')
    if (typeof email !== 'string') throw new Error('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new Error('email is not valid')
    if (typeof password !== 'string') throw new Error('password is not a string')
    if (password.length < 8) throw new Error('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new Error('password has spaces')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr

            if (status === 201)
                resolve()
            else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a'))
                    reject(new TypeError(error))
                else if (error.includes('valid') || error.includes('spaces'))
                    reject(new FormatError(error))
                else if (error.includes('length'))
                    reject(new LengthError(error))
            } else if (status === 409) {
                const { error } = JSON.parse(json)

                reject(new ConflictError(error))
            } else if (status < 500)
                reject(new UnexpectedError('client error'))
            else
                reject(new UnexpectedError('server error'))
        }

        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('POST', 'http://localhost/users')
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { name, email, password }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}