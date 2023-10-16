const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
const initialUsers = [
  {
    username: 'user',
    name: 'user',
    passwordHash: 'secret'
  },
  {
    username: 'käyttäjä',
    name: 'keijo käyttäjä',
    passwordHash: 'salainen'
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  for (let i = 0; i < initialUsers.length; ++i) {
    let user = new User(initialUsers[i])
    await user.save()
  }
})

describe('creating users', () => {
  test('is rejected if password is too short', async () => {
    const newUser = {
      username: 'admin',
      name: 'aaro admin',
      password: 'a'
    }
    const response = await api.post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toBeDefined()
  })

  test('is rejected if username already exists', async () => {
    const newUser = {
      username: 'user',
      name: 'user',
      password: 'asdasd'
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('is rejected if username is missing', async () => {
    const newUser = {
      name: 'user',
      password: 'asdasd'
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('is rejected if password is missing', async () => {
    const newUser = {
      username: 'uuser',
      name: 'uuser'
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('user is created when user is properly defined', async () => {
    const newUser = {
      username: 'uuser',
      name: 'user',
      password: 'secret'
    }
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
