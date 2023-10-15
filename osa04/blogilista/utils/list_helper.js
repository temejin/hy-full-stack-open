const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (n,blog) => {
    return n+blog.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const reducer = (fav,blog) => {
    if (blog.likes > fav.likes) {
      return blog
    } else {
      return fav
    }
  }
  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return {} }
  const most = { author: "", blogs: -Infinity }
  for (let i = 0; i < blogs.length; ++i) {
    let author = blogs[i].author
    let blogsByAuthor = blogs.filter(blog => blog.author === author)
    if (blogsByAuthor.length > most.blogs) {
      most.author = author
      most.blogs = blogsByAuthor.length
    }
  }
  return most
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return {} }
  const mostLiked = { author: "", likes: -Infinity }
  for (let i = 0; i < blogs.length; ++i) {
    let author = blogs[i].author
    let likesByAuthor = totalLikes(blogs.filter(blog => blog.author === author))
    if (likesByAuthor > mostLiked.likes) {
      mostLiked.author = author
      mostLiked.likes = likesByAuthor
    }
  }
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
