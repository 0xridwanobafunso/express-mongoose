const faker = require('faker')
const Post = require('../../models/v1/Post')
const { fake } = require('faker')

/**
 * @param {'Total Seed'} totalSeeds
 * @description To generate posts seeds
 * @returns Console.log({meesage})
 */
exports.importPostsData = async (totalSeeds) => {
  try {
    let posts = []

    let foreignUsers = [
      '5f27e20601d52a18e4a3571a',
      '5f27e20601d52a18e4a3571b',
      '5f27e20601d52a18e4a3571c',
      '5f27e20601d52a18e4a3571d',
      '5f27e20601d52a18e4a3571e',
      '5f27e20601d52a18e4a3571f',
      '5f27e20601d52a18e4a35720',
      '5f27e20601d52a18e4a35721',
      '5f27e20601d52a18e4a35722',
      '5f27e20601d52a18e4a35723',
      '5f27e20601d52a18e4a35724',
      '5f27e20601d52a18e4a35725',
      '5f27e20601d52a18e4a35726',
      '5f27e20601d52a18e4a35727',
      '5f27e20601d52a18e4a35728',
      '5f27e20601d52a18e4a35729',
      '5f27e20601d52a18e4a3572a',
      '5f27e20601d52a18e4a3572b',
      '5f27e20601d52a18e4a3572c',
      '5f27e20601d52a18e4a3572d',
    ]

    for (var i = 1; i <= totalSeeds; i++) {
      posts.push({
        title: faker.name.title(),
        body: faker.lorem.words(100),
        address: faker.address.streetAddress(true),
        user:
          foreignUsers[
            faker.random.number({
              min: 0,
              max: 19,
            })
          ],
      })
    }

    posts = await Post.create(posts)

    // let ObjectIds = []
    // for (post of posts) {
    //   ObjectIds.push(post._id)
    // }
    // console.log(ObjectIds, ObjectIds.length)

    console.log(`Post seeders imported successfully.`.green.bold)
    process.exit(0)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

/**
 * @description To delete all posts seeds
 * @returns Console.log({meesage})
 */
exports.deletePostsData = async () => {
  try {
    await Post.deleteMany()

    console.log(`Post seeders deleted successfully.`.green.bold)
    process.exit(0)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}
