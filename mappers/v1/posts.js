class Posts {
  /**
   *
   * @param {'field'} field String
   * @description To map transformed key pair to the real column.
   */
  static map(field) {
    let fields = {
      // fakeColumn: 'realColumn',
      title: 'title',
      slug: 'slug',
      body: 'body',
      location: 'location',
      'location.type': 'location.type',
      'location.coordinates': 'location.coordinates',
      'location.formatted_address': 'location.formattedAddress',
      'location.street': 'location.street',
      'location.city': 'location.city',
      'location.state': 'location.state',
      'location.zip_code': 'location.zipcode',
      'location.country': 'location.country',
    }

    return fields[field] ? fields[field] : null
  }

  /**
   *
   * @param {'select'} select Array
   */
  static mapArray(select) {
    let mapSelect = []

    for (let each of select) {
      mapSelect.push(this.map(each))
    }

    return mapSelect.join(' ')
  }

  static mapObj(sorts) {
    let allSorts = {}

    for (let field in sorts) {
      if (!this.map(field)) continue

      allSorts[this.map(field)] = sorts[field]
    }

    return allSorts
  }
}

module.exports = Posts
