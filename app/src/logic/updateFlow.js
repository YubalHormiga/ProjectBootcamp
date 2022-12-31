const { errors: { LengthError } } = require('com')

/* eslint-disable import/no-anonymous-default-export */
/**
 * Updates a post against API
 * @param {string} token The user token
 * @param {string} flow The post id
 * @param {string} tittle The appointment text
 * @param {string} body The appointment text
 * @param {string} date The appointment date * 
 * @param {callback} callback The callback to attend the result
 */
export default function (token, flowId, type, kind, description, amount, date, callback) {
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

    xhr.open('PATCH', `http://localhost/flow/${flowId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const payload = {type, kind, description, amount, date }

    const json = JSON.stringify(payload)

    xhr.send(json)
}

/**
 * Attends the result of the post updation
 * @callback callback
 * @param {Error} error The authentication error
 */