const mozillaCommonPassword = require('fxa-common-password-list')
const commonPassword = require('common-password')

/**
 * @param {'password'} password
 * @returns Boolean
 */
const commonPasswordChecker = (password) => {
  if (!password) return false

  if (mozillaCommonPassword.test(password)) {
    return true
  } else if (commonPassword(password)) {
    return true
  }

  return false
}

module.exports = commonPasswordChecker
