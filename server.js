const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectMongoose = require('./configs/v1/database')
const errorHandler = require('./middleware/v1/errorHandler')
const users = require('./routes/v1/users')
const posts = require('./routes/v1/posts')

// Initialize express app
const app = express()

// Initialize dotenv
dotenv.config({ path: './configs/v1/.env' })

// Initialize Mongo DB
// connectMongoose(process.env.MONGO_URI)

// Parse incoming request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware Logger
app.use(
  morgan(
    '[:date] :method :url :res[content-length] HTTP/:http-version :user-agent'
      .cyan.bold
  )
)

// Mount router
app.use('/api/v1/users', users)
app.use('/api/v1/posts', posts)

// Handle Global Error
app.use(errorHandler)

const PORT = process.env.APP_PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running at ${process.env.APP_PROTOCOL}://${process.env.APP_URL}:${PORT}`
      .blue.bold
  )
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold)
  server.close(process.exit(1))
})
