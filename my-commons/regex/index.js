const IS_ALPHABETICAL_REGEX = /^[a-zA-Z() ]+$/
const IS_EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const HAS_SPACES_REGEX = /\s/
const HAS_NO_SPACES_REGEX = /^\S*$/

module.exports = {
    IS_ALPHABETICAL_REGEX,
    IS_EMAIL_REGEX,
    HAS_SPACES_REGEX,
    HAS_NO_SPACES_REGEX
}