class Users {
  /**
   *
   * @param {'field'} field String
   * @description To map transformed key pair to the real column.
   */
  static map(field) {
    let fields = {
      firstname: 'firstName',
      lastname: 'lastName',
      age: 'age',
      username: 'username',
      email: 'email',
      password: 'password',
      phone: 'phone',
      course: 'course',
      is_verified: 'isVerified',
      rating: 'rating',
      created_at: 'createdAt',
      updated_at: 'updatedAt',
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

module.exports = Users
