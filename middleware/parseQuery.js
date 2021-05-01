module.exports = {
  parseQuery: (query) => {
    const pageString = query.title ? query.title : query.name
    const page = +query.page || 1
    let pageSize = +query.pageSize || 10
    pageSize = pageSize > 10 ? 10 : pageSize
    pageSize = pageSize < 1 ? 1 : pageSize
    return { page, pageSize, pageString }
  },
}

// handles query
// reused and modified logic
