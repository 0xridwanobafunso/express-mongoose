const mongoose = require('mongoose')

/**
 * @param uri
 * @description To connect to Mongo DB
 */
connectMongoose = async (uri) => {
  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log(`Mongo atlas connected at ${db.connection.host}`.bgGreen.bold)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold)
  }
}

module.exports = connectMongoose
