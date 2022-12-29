const errorHandler = (err, req, res, next) => {
  let errors
  let message = err.message || 'Internal server error!'
  let code = 500

  console.log(err.message)

  if (err.name == 'CastError') {
    errors = {}
    code = 404
    message = `${err.message.split(' ')[12].split('"')[1]} not found!`
    console.log()
  }

  // Validation Error Handling
  if (err.name == 'ValidationError') {
    enums = []
    errors = {}
    code = 400
    message = 'Model validation error!'

    // Iterate through all the err.errors object
    for (each in err.errors) {
      if (err.errors[each].kind == 'enum') {
        err.errors[each].path.split('.').length > 1
          ? enums.push(
              `${err.errors[each].value} is not a valid ${
                err.errors[each].path.split('.')[0]
              } option`
            )
          : enums.push(
              `${err.errors[each].value} is not a valid ${err.errors[each].path} option`
            )

        // Put enums into enums arrays
        errors[err.errors[each].path.split('.')[0]] = enums
      } else {
        errors[err.errors[each].path] = err.errors[each].message
      }
    }
  }

  // Mongo Duplicate Key (unique field)
  if (err.name == 'MongoError') {
    if (err.code == '11000') {
      errors = {}
      code = 400
      message = 'Duplicate key error!'
      for (key in err.keyValue) {
        errors[key] = `${key} has been taken`
      }
    }
  }

  res.status(code).json({
    success: false,
    message,
    errors,
    code,
  })

  next()
}

module.exports = errorHandler
