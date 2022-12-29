const Post = require('../../models/v1/Post')

const postsMapper = require('../../mappers/v1/posts')
const usersMapper = require('../../mappers/v1/users')

const postsResource = require('../../resources/v1/posts')

const queryParams = require('../../helpers/v1/queryParams')
const offsetPagination = require('../../helpers/v1/offsetPagination')

const asyncHandler = require('../../middleware/v1/asyncHandler')

/**
 * @param {'Request'} req
 * @param {'Response'} res
 * @param {'Next'} next
 * @description To get all posts
 * @route GET - api/v1/posts
 * @access Public
 */
exports.getPosts = asyncHandler(async (req, res, next) => {
  let {
    filter,
    limit,
    select,
    sort,
    page,
    startIndex,
    endIndex,
  } = queryParams.query(req, res, next)

  let total = await Post.countDocuments()

  let posts = await Post.find(filter)
    .select(postsMapper.mapArray(select.parent.split(' ')))
    .populate({
      path: 'user',
      select: usersMapper.mapArray(select.child.split(' ')),
    })
    .sort(postsMapper.mapObj(sort))
    .skip(startIndex)
    .limit(limit)

  res.status(200).json({
    success: true,
    data: {
      posts: postsResource.all(posts),
    },
    pagination: offsetPagination.data(
      'api/v1/posts',
      total,
      limit,
      page,
      startIndex,
      endIndex,
      filter,
      select,
      sort
    ),
    code: 200,
  })
})

exports.getPost = asyncHandler(async (req, res, next) => {})

/**
 * @param {'Request'} req
 * @param {'Response'} res
 * @param {'Next'} next
 * @description To create new post
 * @route POST - api/v1/posts
 * @access Public
 */
exports.createPost = asyncHandler(async (req, res, next) => {
  let post = req.body

  // Check if req.body is empty
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      success: false,
      messages: 'Request body cannot be empty!',
      errors: {},
      code: 400,
    })
  }

  // for (field in req.body) {
  //   if (!usersMapper.map(field)) continue

  //   usersMapper.map(field) == 'isVerified'
  //     ? (user[usersMapper.map(field)] = false)
  //     : (user[usersMapper.map(field)] = req.body[field])
  // }

  post = await Post.create(post)

  res.status(200).json({
    success: true,
    message: 'Post created successfully',
    data: { post },
    code: 200,
  })
})

exports.updatePost = asyncHandler(async (req, res, next) => {})

exports.deletePost = asyncHandler(async (req, res, next) => {})
