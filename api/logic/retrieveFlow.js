const { errors: { FormatError, NotFoundError } } = require('com')
const { User, Flow } = require('../models')

/**
 * Retrieves a flow from user
 * @param {string} userId The user id
 * @param {string} flowId The flow id
 */
module.exports = function (userId, flowId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new FormatError('userId is empty')
    if (typeof flowId !== 'string') throw new TypeError('flowId is not a string')
    if (!flowId.length) throw new FormatError('flowId is empty')

    return User.findById(userId) // .findOne({ _id: ... })
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Flow.findById(flowId).lean()
        })
        .then(flow => {
            if (!flow)
                throw new NotFoundError(`flow with id ${appointmentId} does not exist`)

            delete flow._id
            delete flow.user
            delete flow.date

            return flow
        })
}