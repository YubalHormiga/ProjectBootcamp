module.exports = (req, res, next) => {
    let content = ''

    req.on('data', chunk => content += chunk.toString())

    req.on('end', () => {
        const body = JSON.parse(content)

        req.body = body

        next()
    })
}