/**
 *
 * @param {'async function'} fn
 * @description To apply DRY principle to aysnc ... await to avoid repeating
 * try { } ... catch{}
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler
