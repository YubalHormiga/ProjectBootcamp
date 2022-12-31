import { LengthError, FormatError, AuthError, NotFoundError, UnexpectedError } from "com/errors"

/* eslint-disable import/no-anonymous-default-export */
/**
 * Creates a post against API
 * @param {string} token The user token
 * @param {string} text The post text
 * @param {string} visibility The post visibility
 * @param {callback} callback The callback to attend the result
 */
export default function (token, type, kind, description, amount, date, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')
    if (typeof type !== 'string') throw new TypeError('type is not a string')
    if (!type.length) throw new LengthError('type is empty')
    if (typeof kind !== 'string') throw new TypeError('kind is not a string')
    if (!kind.length) throw new LengthError('kind is empty')
    if (typeof description !== 'string') throw new TypeError('description is not a string')
    if (!description.length) throw new LengthError('description is empty')
    if (typeof amount !== 'number') throw new TypeError('amount is not a number')
    if (!amount) throw new LengthError('amount is empty')


    if (!callback)
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest

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

            xhr.open('POST', 'http://localhost/flow')
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
            xhr.setRequestHeader('Content-Type', 'application/json')

            const payload = { type, kind, description, amount, date }

            const json = JSON.stringify(payload)

            xhr.send(json)
        })

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

    xhr.open('POST', 'http://localhost/flow')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const payload = { type, kind, description, amount, date }

    const json = JSON.stringify(payload)

    xhr.send(json)
}

/**
 * Attends the result of the post creation
 * @callback callback
 * @param {Error} error The authentication error
 */