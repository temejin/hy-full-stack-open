const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let i = 0; i < initialBlogs.length; ++i) {
    let blog = new Blog(initialBlogs[i])
    await blog.save()
  }
})

const getAllBlogs = (async () => {
  const response = await api.get('/api/blogs')
  return response.body
})

test('all blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect('Content-type', /application\/json/)
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('returned blogs are identified with id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(blog => expect(blog.id).toBeDefined())
})

test('blog is added', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('if amount of likes is not given it is set to 0', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  }  

  const response = await api.post('/api/blogs').send(newBlog)
  const addedBlog = response.body
  expect(addedBlog.likes).toBeDefined()
  expect(addedBlog.likes).toBe(0)
})

test('blogs without title or url are rejected with code 400', async () => {
  let newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
  }  
  await api.post('/api/blogs').send(newBlog).expect(400)
  let blogs = await getAllBlogs()
  expect(blogs).toHaveLength(initialBlogs.length)
  newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
  await api.post('/api/blogs').send(newBlog).expect(400)
  blogs = await getAllBlogs()
  expect(blogs).toHaveLength(initialBlogs.length)
})

test('delete removes the blog from database', async () => {
  let blogs = await getAllBlogs()
  const blog = blogs[0]
  await api.delete(`/api/blogs/${blog.id}`).expect(204)
  blogs = await getAllBlogs()
  expect(blogs.map(b => b.id)).not.toContain(blog.id)
})

test('delete with invalid id receives code 400', async () => {
  await api.delete('/api/blogs/2j3o').expect(400)
})

test('put updates blog data', async () => {
  let blogs = await getAllBlogs()
  const initialLikes = blogs[0].likes
  const updatedBlog = blogs[0]
  const id = updatedBlog.id
  updatedBlog.likes = initialLikes + 3
  delete updatedBlog.id
  const response = await api.put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect('Content-type', /application\/json/)
  expect(Number(response.body.likes)).toBe(initialLikes + 3)
})

test('put to invalid id receives code 400', async () => {
  await api.put('/api/blogs/r4e')
    .send({
      author: 'author',
      title: 'title',
      url: 'url',
      likes: 2
    })
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
