const faker = require('faker')
const User = require('../../models/v1/User')
const { random } = require('faker')

/**
 * @param {'Total Seed'} totalSeeds
 * @description To generate users seeds
 * @returns Console.log({meesage})
 */
exports.importUsersData = async (totalSeeds) => {
  try {
    let users = []

    let course = ['Web Dev', 'Mobile Dev', 'Desktop Dev']

    for (var i = 1; i <= totalSeeds; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.random.number({
          min: 13,
          max: 100,
        }),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber(),
        course: [
          course[
            faker.random.number({
              min: 0,
              max: 2,
            })
          ],
          course[
            faker.random.number({
              min: 0,
              max: 2,
            })
          ],
        ],
        isVerified: faker.random.boolean(),
        rating: faker.random.number({
          min: 1,
          max: 10,
        }),
        // createdAt: new Date(),
        // updatedAt: null,
      })
    }

    users = await User.create(users)

    let ObjectIds = []
    for (user of users) {
      ObjectIds.push(user._id)
    }
    console.log(ObjectIds, ObjectIds.length)

    console.log(`User seeders imported successfully.`.green.bold)
    process.exit(0)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

/**
 * @description To delete all users seeds
 * @returns Console.log({meesage})
 */
exports.deleteUsersData = async () => {
  try {
    await User.deleteMany()

    console.log(`User seeders deleted successfully.`.green.bold)
    process.exit(0)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}
