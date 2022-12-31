import { LengthError, FormatError, AuthError, NotFoundError, UnexpectedError } from "com/errors"

/* eslint-disable import/no-anonymous-default-export */
/**z
 * Creates a appointmet against API
 * @param {string} token The user token
 * @param {string} tittle The appointment text
 * @param {string} body The appointment text
 * @param {string} date The appointment date * 
 * @param {callback} callback The callback to attend the result
 */
export default function (token, title, body, date, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')
    if (typeof title !== 'string') throw new TypeError('title is not a string')
    if (!title.length) throw new LengthError('title is empty')
    if (typeof body !== 'string') throw new TypeError('body is not a string')
    if (!body.length) throw new LengthError('body is empty')
    if (!(date instanceof Date)) throw new TypeError('date is not a Date')

    if (!callback) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                const { status, responseText: json } = xhr

                if (status === 201)
                    resolve()
                else if (status === 400) {
                    const { error } = JSON.parse(json)

                    if (error.includes('is not a '))
                        reject(new TypeError(error))
                    else if (error.includes('empty'))
                        reject(new LengthError(error))
                    else if (error.includes('invalid'))
                        reject(new FormatError(error))
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

            xhr.open('POST', 'http://localhost/appointment')
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
            xhr.setRequestHeader('Content-Type', 'application/json')

            const payload = { title, body, date }

            const json = JSON.stringify(payload)

            xhr.send(json)
        })
    }
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        callback(null)
    }

    xhr.onerror = () => callback(new Error('connection error'))

    xhr.open('POST', 'http://localhost/appointment')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const payload = { title, body, date }

    const json = JSON.stringify(payload)

    xhr.send(json)
}

/**
 * Attends the result of the appointment creation
 * @callback callback
 * @param {Error} error The authentication error
 */