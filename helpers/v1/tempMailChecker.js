const mailChecker = require('mailchecker')

/**
 * @param {'email'} email
 * @returns Boolean
 */
const tempMailChecker = (email) => {
  if (!email) return false

  if (!mailChecker.isValid(email)) {
    return true
  }
  return false
}

module.exports = tempMailChecker
