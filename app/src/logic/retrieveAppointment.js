import { LengthError, FormatError, AuthError, NotFoundError, UnexpectedError } from "com/errors"

/* eslint-disable import/no-anonymous-default-export */
export default function (token, appointmentId, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')
    if (typeof appointmentId !== 'string') throw new TypeError('appointmentId is not a string')
    if (!appointmentId.length) throw new FormatError('appointmentId is empty')

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

            xhr.open('GET', `http://localhost/appointment/${appointmentId}`)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
            xhr.send()
        })

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            const { error } = JSON.parse(json)

            callback(new Error(error))

            return
        }

        const appointment = JSON.parse(json)

        callback(null, appointment)
    }

    xhr.onerror = () => callback(new Error('connection error'))

    xhr.open('GET', `http://localhost/appointment/${appointmentId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send()
}