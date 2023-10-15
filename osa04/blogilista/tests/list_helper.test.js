const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blog1 = {
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
}
const blog2 = {
  _id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0
}
const blog3 =   {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
}
const blog4 = {
  _id: "5a422b891b54a676234d17fa",
  title: "First class tests",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  likes: 10,
  __v: 0
}
const blog5 = {
  _id: "5a422ba71b54a676234d17fb",
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 0,
  __v: 0
}
const blog6 = {
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  __v: 0
}  
const blogs = [blog1,blog2,blog3,blog4,blog5,blog6]

describe('total likes', () => {
  test('correctly returns likes of a single blog', () => {
    expect(listHelper.totalLikes([blog1])).toBe(7)
    expect(listHelper.totalLikes([blog2])).toBe(5)
    expect(listHelper.totalLikes([blog3])).toBe(12)
  })

  test('correctly calculates sum of multiple blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  test('returns 0 for an empty list of blogs', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('favourite blog', () => {
  test('returns an empty object for an empty list', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('returns the blog when there is only one', () => {
    expect(listHelper.favoriteBlog([blog1])).toEqual(blog1)
    expect(listHelper.favoriteBlog([blog2])).toEqual(blog2)
  })

  test('returns the blog with most likes in a list', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blog3)
  })
})

describe('most blogs', () => {
  test('returns an empty object when list is empty', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('correctly returns author of most blogs and blog count', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('returns an empty object when list is empty', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('correctly returns author with most likes and total likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
