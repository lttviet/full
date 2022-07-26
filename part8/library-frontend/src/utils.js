export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (lst) => {
    const seen = new Set()
    return lst.filter((item) => {
      const title = item.title
      return seen.has(title) ? false : seen.add(title)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })
}
