/* eslint-disable import/no-anonymous-default-export */
/**
 * Deletes a post against API
 * @param {string} token The user token
 * @param {string} appointmet Id The post id
 * @param {callback} callback The callback to attend the result
 */
export default function (token, appointmentId, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')
    if (typeof appointmentId !== 'string') throw new TypeError('appointmentId is not a string')
    if (!appointmentId.length) throw new Error('appointmentId is empty')

    if (!callback)
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest

            xhr.onload = () => {
                const { status, responseText: json } = xhr

                if (status >= 500) {
                    const { error } = JSON.parse(json)

                    reject(new Error(error))

                    return
                }

                resolve()
            }

            xhr.onerror = () => reject(new Error('connection error'))

            xhr.open('DELETE', `http://localhost/appointment/${appointmentId}`)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)

            xhr.send()
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

    xhr.open('DELETE', `http://localhost/appointment/${appointmentId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}

/**
 * Attends the result of the post deletion
 * @callback callback
 * @param {Error} error The authentication error
 */