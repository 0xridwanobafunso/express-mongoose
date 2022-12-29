const nodeGeoCoder = require('node-geocoder')

/**
 * @param {'provider'} provider
 * @param {'api key'} apiKey
 * @description GEO coding
 */
const geoCoder = (provider, apiKey) => {
  return nodeGeoCoder({
    provider,
    apiKey,
    httpAdapter: 'https',
    formatter: null,
  })
}

// '18 Bolade St, Abeokuta South, Ogun 110101, Nigeria'

module.exports = geoCoder
