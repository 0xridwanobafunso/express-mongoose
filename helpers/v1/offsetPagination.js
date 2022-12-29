class OffsetPagination {
  /**
   * @param {'url'} url
   * @param {'total'} total
   * @param {'limit'} limit
   * @param {'page'} page
   * @param {'startIndex'} startIndex
   * @param {'endIndex'} endIndex
   * @param {'filter'} filter
   * @param {'select'} select
   * @param {'sort'} sort
   * @description To generate pagination offset links
   */
  static data(
    url,
    total,
    limit,
    page,
    startIndex,
    endIndex,
    filter,
    select,
    sort
  ) {
    let filters = ''
    let sorts = ''
    let selects = ''

    if (Object.keys(filter).length > 0) {
      for (let each in filter) {
        for (let e in filter[each]) {
          filters =
            filters + `filter[${each}][${e.split('$')[1]}]=${filter[each][e]}&`
        }
      }
      filters = filters.substring(0, filters.split('').length - 1)
    }

    if (Object.keys(select).length > 0) {
      if (select.parent || select.child) {
        for (let each in select) {
          if (select[each] == '') continue
          selects =
            selects + `select[${each}]=${select[each].split(' ').join(',')}&`
        }
      } else {
        selects = ''
      }

      selects = selects.substring(0, selects.split('').length - 1)
    }

    if (Object.keys(sort).length > 0) {
      for (let each in sort) {
        sorts = sorts + `sort[${each}]=${sort[each]}&`
      }
      sorts = sorts.substring(0, sorts.split('').length - 1)
    }

    // Offset pagination start here
    let pagination = {}
    pagination.total = total
    pagination.limit = limit

    pagination.page = {}

    if (filters) {
      if (selects) {
        pagination.page.current = `${process.env.APP_PROTOCOL}://${process.env.APP_URL}:${process.env.APP_PORT}/${url}?page=${page}&limit=${limit}&${filters}&${selects}&${sorts}`
      } else {
        pagination.page.current = `${process.env.APP_PROTOCOL}://${process.env.APP_URL}:${process.env.APP_PORT}/${url}?page=${page}&limit=${limit}&${filters}&${sorts}`
      }
    } else {
      if (selects) {
        pagination.page.current = `${process.env.APP_PROTOCOL}://${process.env.APP_URL}:${process.env.APP_PORT}/${url}?page=${page}&limit=${limit}&${selects}&${sorts}`
      } else {
        pagination.page.current = `${process.env.APP_PROTOCOL}://${process.env.APP_URL}:${process.env.APP_PORT}/${url}?page=${page}&limit=${limit}&${sorts}`
      }
    }

    if (startIndex > 0) {
      if (filters) {
        if (selects) {
          pagination.page.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page - 1
          }&limit=${limit}&${filters}&${selects}&${sorts}`
        } else {
          pagination.page.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page - 1
          }&limit=${limit}&${filters}&${sorts}`
        }
      } else {
        if (selects) {
          pagination.page.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page - 1
          }&limit=${limit}&${selects}&${sorts}`
        } else {
          pagination.page.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page - 1
          }&limit=${limit}&${sorts}`
        }
      }
    } else {
      pagination.page.prev = null
    }

    if (endIndex < total) {
      if (filters) {
        if (selects) {
          pagination.page.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page + 1
          }&limit=${limit}&${filters}&${selects}&${sorts}`
        } else {
          pagination.page.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page + 1
          }&limit=${limit}&${filters}&${sorts}`
        }
      } else {
        if (selects) {
          pagination.page.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page + 1
          }&limit=${limit}&${selects}&${sorts}`
        } else {
          pagination.page.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${process.env.APP_PORT}/${url}?page=${
            page + 1
          }&limit=${limit}&${sorts}`
        }
      }
    } else {
      pagination.page.next = null
    }

    return pagination
  }
}

module.exports = OffsetPagination
