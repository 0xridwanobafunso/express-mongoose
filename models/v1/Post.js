const mongoose = require('mongoose')
const cursorBasedPagination = require('mongoose-paginate-v2')
const geoCoder = require('../../helpers/v1/geoCoder')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please enter a title'],
      maxlength: [150, 'Title cannot be more than 150 characters'],
    },
    slug: String,
    body: {
      type: String,
      required: [true, 'Please enter a body'],
      maxlength: [1500, 'Title cannot be more than 1500 characters'],
    },
    address: {
      type: String,
      required: [true, 'Please enter an address'],
      maxlength: [300, 'Title cannot be more than 300 characters'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        // required: [true, 'Please provide valid type option'],
      },
      coordinates: {
        type: [Number],
        // required: [true, 'Please provide valid array of longitude / latitude'],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

PostSchema.plugin(cursorBasedPagination)

PostSchema.pre('save', async function (next) {
  const geoLocation = await geoCoder(
    process.env.GEOCODER_PROVIDER,
    process.env.GEOCODER_API_KEY
  ).geocode(this.address)

  this.location = {
    type: 'Point',
    coordinates: [geoLocation[0].longitude, geoLocation[0].latitude],
    formattedAddress: geoLocation[0].formattedAddress,
    street: geoLocation[0].streetName,
    city: geoLocation[0].city,
    state: geoLocation[0].stateCode,
    zipcode: geoLocation[0].zipcode,
    country: geoLocation[0].countryCode,
  }

  this.address = undefined

  next()
})

PostSchema.pre('save', function (next) {
  this.slug = this.title.split(' ').join('-').toLowerCase()

  next()
})

module.exports = mongoose.model('Post', PostSchema)
