import { regex, errors } from 'com'

const { IS_EMAIL_REGEX, HAS_SPACES_REGEX } = regex
const { FormatError, AuthError, LengthError, NotFoundError, UnexpectedError } = errors
/**
 * Authenticates a user
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 */
export default function authenticateUser(email, password) {
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (!IS_EMAIL_REGEX.test(email)) throw new FormatError('email is not valid')
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (password.length < 8) throw new LengthError('password length is less than 8')
    if (HAS_SPACES_REGEX.test(password)) throw new FormatError('password has spaces')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr

            if (status === 200) {
                const { token } = JSON.parse(json)

                resolve(token)
            } else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a'))
                    reject(new TypeError(error))
                else if (error.includes('valid') || error.includes('spaces'))
                    reject(new FormatError(error))
                else if (error.includes('length'))
                    reject(new LengthError(error))
            } else if (status === 401) {
                const { error } = JSON.parse(json)

                reject(new AuthError(error))
            } else if (status === 404) {
                const { error } = JSON.parse(json)

                reject(new NotFoundError(error))
            } else if (status < 500)
                reject(new UnexpectedError('client error'))
            else
                reject(new UnexpectedError('server error'))

        }

        xhr.onerror = () => reject(new Error('connection error'))


        xhr.open('POST', 'http://localhost/users/auth')
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { email, password }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}