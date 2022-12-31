export default function extractSubFromToken(token) {
    const tokenParts = token.split('.')

    const payload64 = tokenParts[1]

    const payloadJSON = atob(payload64)

    const payload = JSON.parse(payloadJSON)

    return payload.sub
}