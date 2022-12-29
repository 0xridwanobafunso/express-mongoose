const Base64 = require('./base64')

class CursorPagination {
  /**
   *
   * @param {'models'} models
   * @param {'url'} url
   * @param {'filter'} filter
   * @param {'limit'} limit
   * @param {'select'} select
   * @param {'sort'} sort
   * @description To generate pagination cursor links
   */
  static data(models, url, filter, limit, select, sort) {
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

    // Cursor pagination start here
    let pagination = {}
    pagination.total = models.totalDocs
    pagination.limit = limit

    pagination.cursor = {}

    if (filters) {
      if (selects) {
        pagination.cursor.current = `${process.env.APP_PROTOCOL}://${
          process.env.APP_URL
        }:${process.env.APP_PORT}/${url}?limit=${limit}&cursor=${Base64.encode(
          `current_page_${models.page}_cursor`
        )}&${filters}&${selects}&${sorts}`
      } else {
        pagination.cursor.current = `${process.env.APP_PROTOCOL}://${
          process.env.APP_URL
        }:${process.env.APP_PORT}/${url}?limit=${limit}&cursor=${Base64.encode(
          `current_page_${models.page}_cursor`
        )}&${filters}&${sorts}`
      }
    } else {
      if (selects) {
        pagination.cursor.current = `${process.env.APP_PROTOCOL}://${
          process.env.APP_URL
        }:${process.env.APP_PORT}/${url}?limit=${limit}&cursor=${Base64.encode(
          `current_page_${models.page}_cursor`
        )}&${selects}&${sorts}`
      } else {
        pagination.cursor.current = `${process.env.APP_PROTOCOL}://${
          process.env.APP_URL
        }:${process.env.APP_PORT}/${url}?limit=${limit}&cursor=${Base64.encode(
          `current_page_${models.page}_cursor`
        )}&${sorts}`
      }
    }

    if (models.hasPrevPage) {
      if (filters) {
        if (selects) {
          pagination.cursor.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `prev_page_${models.prevPage}_cursor`
          )}&${filters}&${selects}&${sorts}`
        } else {
          pagination.cursor.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `prev_page_${models.prevPage}_cursor`
          )}&${filters}&${sorts}`
        }
      } else {
        if (selects) {
          pagination.cursor.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `prev_page_${models.prevPage}_cursor`
          )}&${selects}&${sorts}`
        } else {
          pagination.cursor.prev = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `prev_page_${models.prevPage}_cursor`
          )}&${sorts}`
        }
      }
    } else {
      pagination.cursor.prev = null
    }

    if (models.hasNextPage) {
      if (filters) {
        if (selects) {
          pagination.cursor.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `next_page_${models.nextPage}_cursor`
          )}&${filters}&${selects}&${sorts}`
        } else {
          pagination.cursor.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `next_page_${models.nextPage}_cursor`
          )}&${filters}&${sorts}`
        }
      } else {
        if (selects) {
          pagination.cursor.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `next_page_${models.nextPage}_cursor`
          )}&${selects}&${sorts}`
        } else {
          pagination.cursor.next = `${process.env.APP_PROTOCOL}://${
            process.env.APP_URL
          }:${
            process.env.APP_PORT
          }/${url}?limit=${limit}&cursor=${Base64.encode(
            `next_page_${models.nextPage}_cursor`
          )}&${sorts}`
        }
      }
    } else {
      pagination.cursor.next = null
    }

    return pagination
  }
}

module.exports = CursorPagination
