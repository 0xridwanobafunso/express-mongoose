const postsResource = require('./posts')

exports.all = (users) => {
  let all = []

  users.forEach((user) => {
    all.push({
      _id: user._id,
      firstname: user.firstName,
      lastname: user.lastName,
      age: user.age,
      username: user.username,
      email: user.email,
      phone: user.phone,
      course: user.course,
      rating: user.rating,
      posts: postsResource.all(user.posts),
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    })
  })

  return all
}

exports.single = (user) => {
  return {
    _id: user._id,
    firstname: user.firstName,
    lastname: user.lastName,
    age: user.age,
    username: user.username,
    email: user.email,
    phone: user.phone,
    course: user.course,
    rating: user.rating,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  }
}
