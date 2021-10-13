/* eslint-disable no-param-reassign */
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs
  .map((b) => b.likes)
  .reduce((total, num) => (total + num), 0)

const favoriteBlog = (blogs) => {
  if (!blogs || !blogs.length) return null

  return blogs
    .reduce((topFav, currBlog) => (
      (topFav.likes > currBlog.likes) ? topFav : currBlog
    ))
}

const mostBlogs = (blogs) => {
  if (!blogs || !blogs.length) return null

  // key-value of author and number of blogs
  const blogCount = blogs.reduce((obj, { author }) => {
    obj[author] = obj[author] || 0
    obj[author] += 1
    return obj
  }, {})

  const authorWithMaxBlog = Object
    .keys(blogCount)
    .reduce((maxAuthor, currAuthor) => (
      blogCount[maxAuthor] > blogCount[currAuthor] ? maxAuthor : currAuthor
    ))

  return { author: authorWithMaxBlog, blogs: blogCount[authorWithMaxBlog] }
}

const mostLikes = (blogs) => {
  if (!blogs || !blogs.length) return null

  const likeCount = blogs.reduce((obj, { author, likes }) => {
    obj[author] = obj[author] || 0
    obj[author] += likes
    return obj
  }, {})

  const authorWithMaxLike = Object
    .keys(likeCount)
    .reduce((maxAuthor, currAuthor) => (
      likeCount[maxAuthor] > likeCount[currAuthor] ? maxAuthor : currAuthor
    ))

  return { author: authorWithMaxLike, likes: likeCount[authorWithMaxLike] }
}

export {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}
