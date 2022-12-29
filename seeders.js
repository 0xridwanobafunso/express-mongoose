const dotenv = require('dotenv')
const colors = require('colors')
const connectMongoose = require('./configs/v1/database')

// Load env variables
dotenv.config({ path: './configs/v1/.env' })

// Connect to Mongo Atlas
connectMongoose(process.env.MONGO_URI)

// Seeders
const { importUsersData, deleteUsersData } = require('./seeders/v1/users')
const { importPostsData, deletePostsData } = require('./seeders/v1/posts')

if (process.argv[2] == '-i') {
  if (isNaN(process.argv[3])) {
    console.log(
      `ONLY numbers is allowed for number of seed to be generated.`.red.bold
    )
    console.log(`10 [model(s)] e.g 10 users`.cyan)

    // Stop the seeders.js
    process.exit(0)
  }

  /**
   * ------------------------------------
   *       SEED STARTS HERE (IMPORT)
   * ------------------------------------
   */
  if (process.argv[4] == 'users') {
    importUsersData(+process.argv[3])
  } else if (process.argv[4] == 'posts') {
    importPostsData(+process.argv[3])
  } else {
    console.log(`Seeds ${process.argv[4]} is not found for importing.`.red.bold)

    // Stop the seeders.js
    process.exit(0)
  }
  /**
   * ------------------------------------
   *       SEED ENDS HERE (IMPORT)
   * ------------------------------------
   */
} else if (process.argv[2] == '-d') {
  if (process.argv[3] !== 'all') {
    console.log(`ONLY all is allowed to delete all related seed.`.red.bold)
    console.log(`all [model(s)] e.g all users`.cyan)

    // Stop the seeders.js
    process.exit(0)
  }

  /**
   * ------------------------------------
   *      UNSEED STARTS HERE (DELETE)
   * ------------------------------------
   */
  if (process.argv[4] == 'users') {
    deleteUsersData()
  } else if (process.argv[4] == 'posts') {
    deletePostsData()
  } else {
    console.log(`Seeds ${process.argv[4]} is not found for deletion.`.red.bold)

    // Stop the seeders.js
    process.exit(0)
  }
  /**
   * ------------------------------------
   *      UNSEED ENDS HERE (DELETE)
   * ------------------------------------
   */
} else {
  console.log(`ONLY -i, -d is supported`.red.bold)
  console.log(`-i: For importing`.cyan)
  console.log(`-d: For deletion`.cyan)

  // Stop the seeders.js
  process.exit(0)
}

process.on('unhandledRejection', (err, promise) => {})
