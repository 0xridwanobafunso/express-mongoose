const User = require('../../models/v1/User')

const usersMapper = require('../../mappers/v1/users')
const postsMapper = require('../../mappers/v1/posts')

const usersResource = require('../../resources/v1/users')

const asyncHandler = require('../../middleware/v1/asyncHandler')

const { query } = require('../../helpers/v1/queryParams')
const cursorPagination = require('../../helpers/v1/cursorPagination')
const offsetPagination = require('../../helpers/v1/offsetPagination')

const commonPasswordChecker = require('../../helpers/v1/commonPasswordChecker')
const tempMailChecker = require('../../helpers/v1/tempMailChecker')
const Base64 = require('../../helpers/v1/base64')

// Email Validation - npm i mailchecker
// Common Password - npm i fxa-common-password-list

/**
 * @param {'Request'} req
 * @param {'Response'} res
 * @param {'Next'} next
 * @description To get all Users
 * @route GET - api/v1/users
 * @access Public
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  // CURSOR-BASED PAGINATION
  let { error, filter, limit, select, sort, cursor_decode } = query(
    req,
    res,
    next
  )

  if (!error) {
    let users = await User.paginate(filter, {
      limit,
      select: usersMapper.mapArray(select.parent.split(' ')),
      sort: usersMapper.mapObj(sort),
      page: cursor_decode,
      populate: {
        path: 'posts',
        select: postsMapper.mapArray(select.child.split(' ')),
      },
    })

    res.status(200).json({
      data: {
        success: true,
        users: usersResource.all(users.docs),
        pagination: cursorPagination.data(
          users,
          'api/v1/users',
          filter,
          limit,
          select,
          sort
        ),
        code: 200,
      },
    })
  }

  // OFFSET-BASED PAGINATION
  // let {
  //   error,
  //   filter,
  //   page,
  //   limit,
  //   startIndex,
  //   endIndex,
  //   select,
  //   sort,
  // } = query(req, res, next)

  // if (!error) {
  //   let total = await User.countDocuments()

  //   let users = await User.find(filter)
  //     .select(usersMapper.mapArray(select.parent))
  //     .sort(usersMapper.mapObj(sort))
  //     .skip(startIndex)
  //     .limit(limit)

  //   res.status(200).json({
  //     success: true,
  //     data: {
  //       users: usersResource.all(users),
  //     },
  //     pagination: offsetPagination.data(
  //       'api/v1/users',
  //       total,
  //       limit,
  //       page,
  //       startIndex,
  //       endIndex,
  //       filter,
  //       select,
  //       sort
  //     ),
  //     code: 200,
  //   })
  // }
})

/**
 * @param {'Request'} req
 * @param {'Response'} res
 * @param {'Next'} next
 * @description To create new user
 * @route POST - api/v1/users
 * @access Public
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  let user = {}

  // Check if req.body is empty
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      success: false,
      messages: 'Request body cannot be empty!',
      errors: {},
      code: 400,
    })
  }

  for (field in req.body) {
    if (!usersMapper.map(field)) continue

    usersMapper.map(field) == 'isVerified'
      ? (user[usersMapper.map(field)] = false)
      : (user[usersMapper.map(field)] = req.body[field])
  }

  // Temporary email checker
  if (tempMailChecker(user.email)) {
    return res.status(400).json({
      status: false,
      message: 'Temporal email error!',
      errors: {
        email: "We don't accept temporary email addresses",
      },
      code: 400,
    })
  }

  // Common password checker
  if (commonPasswordChecker(user.password)) {
    return res.status(400).json({
      status: false,
      message: 'Common password error!',
      errors: {
        password: 'The password provided is too common',
      },
      code: 400,
    })
  }

  // Create new users
  user = await User.create(user)

  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: { user: usersResource.single(user) },
    code: 200,
  })
})

/**
 * @param {'Request'} req
 * @param {'Response'} res
 * @param {'Next'} next
 * @description To get all single user
 * @route GET - api/v1/users/:id
 * @access Public
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  // Get single user from database
  let user = await User.findById(id)

  if (!user) {
    return res.status(404).json({
      success: true,
      message: `User not found!`,
      errors: {},
      code: 404,
    })
  }

  res.status(200).json({
    success: true,
    data: {
      user: usersResource.single(user),
    },
    code: 200,
  })
})

/**
 * @param {'Request'} req
 * @param {'Response'} res
 * @param {'Next'} next
 * @description To get all single user
 * @route GET - api/v1/users/:id
 * @access Public
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  let user = {}

  // Check if req.body is empty
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      success: false,
      messages: 'Request body cannot be empty!',
      errors: {},
      code: 400,
    })
  }

  // Loop through req.body and add neccessary fields to user object
  for (field in req.body) {
    if (!usersMapper.map(field)) continue

    usersMapper.map(field) == 'isVerified'
      ? (user[usersMapper.map(field)] = false)
      : (user[usersMapper.map(field)] = req.body[field])
  }

  // Temporary email checker
  if (tempMailChecker(user.email)) {
    return res.status(400).json({
      status: false,
      message: 'Temporal email error!',
      errors: {
        email: "We don't accept temporary email addresses",
      },
      code: 400,
    })
  }

  // Common password checker
  if (commonPasswordChecker(user.password)) {
    return res.status(400).json({
      status: false,
      message: 'Common password error!',
      errors: {
        password: 'The password provided is too common',
      },
      code: 400,
    })
  }

  // Get single user by id and update in database
  user = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    message: 'User updated successfully!',
    data: {
      user: usersResource.single(user),
    },
    code: 200,
  })
})

/**
 * @param {'Request'} req
 * @param {'Response'} res
 * @param {'Next'} next
 * @description To get all single user
 * @route GET - api/v1/users/:id
 * @access Public
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  // Get single user and delete it from database
  let user = await User.findByIdAndDelete(id)

  if (!user) {
    return res.status(404).json({
      success: true,
      message: `User not found!`,
      errors: {},
      code: 404,
    })
  }

  res.status(200).json({
    success: true,
    message: 'User deleted successfully!',
    data: {},
    code: 200,
  })
})
