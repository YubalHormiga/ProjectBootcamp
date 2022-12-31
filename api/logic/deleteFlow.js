const { errors: { LengthError, } } = require('com')
const { User, Flow } = require('../models')

function deleteFlow(userId, flowId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof flowId !== 'string') throw new TypeError('flowId is not a string')
    if (!flowId.length) throw new LengthError('flowId is empty')


    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new Error(`user with id ${userId} does not exist`)

            return Flow.findById(flowId)
        })
        .then(flow => {
            if (!flow)
                throw new Error(`flow with id ${flowId} does not exist`)

            if (flow.user.toString() !== userId)
                throw new Error(`flow with id ${flowId} does not belong to user with id ${userId}`)

            return Flow.findByIdAndDelete(flowId)
        })

}
module.exports = deleteFlow