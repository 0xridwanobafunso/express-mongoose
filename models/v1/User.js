const mongoose = require('mongoose')
const cursorBasedPagination = require('mongoose-paginate-v2')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter a firstname'],
      trim: true,
      maxlength: [25, 'Firstname cannot be greater than 25 characters'],
      // get: (firstName) => firstName.toLowerCase(),
      // set: (firstName) => firstName.toUpperCase(),
    },
    lastName: {
      type: String,
      required: [true, 'Please enter a lastname'],
      trim: true,
      maxlength: [25, 'Lastname cannot be greater than 25 characters'],
    },
    age: {
      type: Number,
      required: [true, 'Please enter your age'],
      trim: true,
      min: [13, 'Age cannot be lesser than 13 years'],
      max: [100, 'Age cannot be greater than 100 years'],
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'Please enter a username'],
      trim: true,
      maxlength: [40, 'Username cannot be greater than 40 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter a email'],
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [8, 'Password cannot be lesser than 8'],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, 'Please enter a phone number'],
      maxlength: [25, 'Phone cannot be greater than 25 characters'],
    },
    course: {
      type: [String],
      required: [true, 'Please select a course'],
      enum: ['Web Dev', 'Mobile Dev', 'Desktop Dev'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      required: [true, 'Please enter rating 1 - 10'],
      min: [1, 'Rating cannot be lesser that 1'],
      max: [10, 'Rating cannot be greater that 10'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// UserSchema.plugin(cursorBasedPagination.default)
UserSchema.plugin(cursorBasedPagination)

// Reverse populate with virtuals
UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
})

// UserSchema.plugin(mongoCursorPagination.mongoosePlugin)

// deletedAt: {
//   type: Date,
//   default: new Date(),
// }

module.exports = mongoose.model('User', UserSchema)
