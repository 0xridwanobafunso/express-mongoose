const Base64 = require('./base64')

/**
 *
 * @param {'request object'} req
 * @param {'response object'} res
 * @param {'middleware'} next
 *
 * @description It return the query params
 * @returns Object
 * @copyright Trademark of Obafunso Ridwan Adebayo
 */
exports.query = (req, res, next) => {
  let error = false
  let page = req.query.page ? Number.parseInt(req.query.page) : 1
  let limit = req.query.limit ? Number.parseInt(req.query.limit) : 10
  let startIndex = (page - 1) * limit
  let endIndex = page * limit
  let cursor_decode

  let filter
  let sort
  let select

  if (limit < 5) {
    res.status(400).json({
      success: false,
      errors: {
        message: 'Page limit must be atleast 5',
      },
      code: 400,
    })

    return { error: true }
  }

  if (page < 1) {
    res.status(400).json({
      success: false,
      errors: {
        message: 'Current page must be atleast 1',
      },
      code: 400,
    })

    return { error: true }
  }

  if (Object.keys(req.query).length > 0) {
    // For filtering
    if (req.query.filter) {
      // For filtering
      filter = JSON.parse(
        JSON.stringify(req.query.filter).replace(
          /\b(gt|gte|lt|lte|in)\b/g,
          (match) => `$${match}`
        )
      )
    } else {
      filter = {}
    }

    // For selecting specific attribute
    if (req.query.select) {
      select = {}

      select.parent = req.query.select.parent
        ? req.query.select.parent.split(',').join(' ')
        : ''
      select.child = req.query.select.child
        ? req.query.select.child.split(',').join(' ')
        : ''
    } else {
      select = {
        parent: '',
        child: '',
      }
    }

    // For sorting
    req.query.sort ? (sort = req.query.sort) : (sort = { createdAt: -1 })

    req.query.cursor
      ? (cursor_decode = Number.parseInt(
          Base64.decode(req.query.cursor).split('_')[2]
        ))
      : (cursor_decode = 1)
  } else {
    filter = {}
    select = {
      parent: '',
      child: '',
    }
    sort = { createdAt: -1 }
    cursor_decode = 1
  }

  return {
    error,
    filter,
    page,
    limit,
    startIndex,
    endIndex,
    select,
    sort,
    cursor_decode,
  }
}

// class queryParams {
//   /**
//    *
//    * @param {'request object'} req
//    * @param {'response object'} res
//    * @param {'middleware'} next
//    *
//    * @description It return the query params
//    * @returns Object
//    * @copyright Trademark of Obafunso Ridwan Adebayo
//    */
//   static query(req, res, next) {
//     let page = Number.parseInt(req.query.page) || 1
//     let limit = Number.parseInt(req.query.limit) || 10
//     let startIndex = (page - 1) * limit
//     let endIndex = page * limit
//     let cursor_decode

//     let filter
//     let sort
//     let select

//     if (Object.keys(req.query).length) {
//       // For filtering
//       if (req.query.filter) {
//         // For filtering
//         filter = JSON.parse(
//           JSON.stringify(req.query.filter).replace(
//             /\b(gt|gte|lt|lte|in)\b/g,
//             (match) => `$${match}`
//           )
//         )
//       } else {
//         filter = {}
//       }

//       // For selecting specific attribute
//       if (req.query.select) {
//         select = {}

//         select.parent = req.query.select.parent
//           ? req.query.select.parent.split(',').join(' ')
//           : ''
//         select.child = req.query.select.child
//           ? req.query.select.child.split(',').join(' ')
//           : ''
//       } else {
//         select = {
//           parent: '',
//           child: '',
//         }
//       }

//       // For sorting
//       req.query.sort ? (sort = req.query.sort) : (sort = { createdAt: -1 })

//       req.query.cursor
//         ? (cursor_decode = Number.parseInt(
//             Base64.decode(req.query.cursor).split('_')[2]
//           ))
//         : (cursor_decode = 1)
//     } else {
//       filter = {}
//       select = {
//         parent: '',
//         child: '',
//       }
//       sort = { createdAt: -1 }
//       cursor_decode = 1
//     }

//     return {
//       filter,
//       page,
//       limit,
//       startIndex,
//       endIndex,
//       select,
//       sort,
//       cursor_decode,
//     }
//   }
// }

// module.exports = queryParams
