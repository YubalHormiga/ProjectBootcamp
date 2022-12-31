/* eslint-disable import/no-anonymous-default-export */
/**
 * Updates a post against API
 * @param {string} token The user token
 * @param {string} appointmentId The post id
 * @param {string} text The post text
 * @param {string} visibility The post visibility
 * @param {callback} callback The callback to attend the result
 */
export default function (token, appointmentId, title, body, date, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')
    if (typeof appointmentId !== 'string') throw new TypeError('appointmentId is not a string')
    if (!appointmentId.length) throw new Error('appointmentId is empty')
    if (typeof title !== 'string') throw new TypeError('title is not a string')
    if (!title.length) throw new Error('title is empty')
    if (typeof body !== 'string') throw new TypeError('body is not a string')
    if (!body.length) throw new Error('body is empty')
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

    xhr.open('PATCH', `http://localhost/appointment/${appointmentId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const payload = { title, body, date }

    const json = JSON.stringify(payload)

    xhr.send(json)
}

/**
 * Attends the result of the post updation
 * @callback callback
 * @param {Error} error The authentication error
 */