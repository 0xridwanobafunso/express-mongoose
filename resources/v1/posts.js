const usersResource = require('./users')

exports.all = (posts) => {
  let all = []

  let isLocation
  posts.forEach((post) => {
    // Algorithm to check if post.location exits
    isLocation = false
    for (let i = 1; i <= Object.values(post.location).length - 1; i++) {
      if (Object.values(post.location)[i] !== undefined) {
        isLocation = true
        break
      }
    }

    all.push({
      _id: post._id,
      title: post.title,
      slug: post.slug,
      body: post.body,
      location: isLocation
        ? {
            type: post.location.type,
            coordinates: post.location.coordinates,
            formatted_address: post.location.formattedAddress,
            street: post.location.street,
            city: post.location.city,
            state: post.location.state,
            zip_code: post.location.zipcode,
            country: post.location.country,
          }
        : undefined,
      user: usersResource.single(post.user),
      links: {
        type: 'GET',
        href: `${process.env.APP_PROTOCOL}://${process.env.APP_URL}:${process.env.APP_PORT}/api/v1/posts/${post._id}`,
      },
      created_at: post.createdAt,
      updated_at: post.updatedAt,
    })
  })

  return all
}

exports.single = (post) => {
  return {
    _id: post._id,
    created_at: post.createdAt,
    updated_at: post.updatedAt,
  }
}
