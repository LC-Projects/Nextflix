const { test, expect, describe } = require('@jest/globals')
const axios = require('axios')

let userId = ''

describe('=============== AUTH ===============', () => {
  test('Register user', async () => {
    let response
    try {
      response = await axios.post('http://localhost:3333/api/register', {
        email: 'registertest@gmail.com',
        password: 'passwordtest',
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(201)
    expect(response.data.message).toBe('User created successfully')
  })

  test('Login user', async () => {
    let response
    try {
      response = await axios.post('http://localhost:3333/api/login', {
        email: 'registertest@gmail.com',
        password: 'passwordtest',
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.token).toBeDefined()
    expect(response.data.message).toBe('User logged succesfully')

    userId = response.data.user.id // Store user_id for later use
  })

  // Test for me endpoint
  test('Get user info', async () => {
    let response
    try {
      response = await axios.post('http://localhost:3333/api/account/', {
        user_id: userId,
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('User retrieved succesfully')
  })

  // Test for update endpoint
  test('Update user info', async () => {
    let response
    try {
      response = await axios.put('http://localhost:3333/api/account/update', {
        user_id: userId,
        email: 'registertest@gmail.com',
        password: 'passwordtest',
        last_name: 'Pitt',
        first_name: 'Brad',
        nick_name: 'BradPitt',
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('User updated succesfully')
  })

  // Test for logout endpoint
  test('Logout user', async () => {
    let response
    try {
      response = await axios.post('http://localhost:3333/api/logout', {
        user_id: userId,
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('User logout succesfully')
  })
})

describe('=============== Movie comments ===============', () => {
  // show all comments
  test('Get all comments', async () => {
    let response
    try {
      response = await axios.get('http://localhost:3333/api/movies/comments')
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
  })

  // add comment
  test('Add comment', async () => {
    let response
    try {
      response = await axios.post('http://localhost:3333/api/movies/comments', {
        user_id: userId,
        movie_id: 25476,
        comment: 'Nice movie !',
        rating: 3,
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(201)
    expect(response.data.message).toBe('Movie comment created')
  })

  // test for show by movie id
  test('Get comment by movie id', async () => {
    let response
    try {
      response = await axios.get('http://localhost:3333/api/movies/comments/byfilm/25476')
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('Here is your movie comment')
    expect(response.data.data).toBeDefined()
  })

  test('Delete comment', async () => {
    let response
    try {
      response = await axios.delete(`http://localhost:3333/api/movies/comments/${userId}/25476`)
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('Movie comment deleted')
  })
})

describe('=============== Movie favorises ===============', () => {
  // show all favorises
  test('Get all favorises', async () => {
    let response
    try {
      response = await axios.get('http://localhost:3333/api/movies/favorises')
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
  })

  // show favorises by user id
  test('Get favorises by user id', async () => {
    let response
    try {
      response = await axios.get(`http://localhost:3333/api/movies/favorises/${userId}`)
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('Here is your movie favoris')
    expect(response.data.data).toBeDefined()
  })

  // add favorises
  test('Add favoris', async () => {
    let response
    try {
      response = await axios.post('http://localhost:3333/api/movies/favorises', {
        user_id: userId,
        movie_id: 25476,
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(201)
    expect(response.data.message).toBe('Movie favoris created')
  })

  test('Delete favoris', async () => {
    let response
    try {
      response = await axios.delete(`http://localhost:3333/api/movies/favorises/${userId}/25476`)
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('Movie favoris deleted')
  })
})

describe('=============== Movie to watch ===============', () => {
  // show all to watch
  test('Get all to watch', async () => {
    let response
    try {
      response = await axios.get('http://localhost:3333/api/movies/to_watch')
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
  })

  // add to watch
  test('Add to watch', async () => {
    let response
    try {
      response = await axios.post('http://localhost:3333/api/movies/to_watch', {
        user_id: userId,
        movie_id: 25476,
      })
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(201)
    expect(response.data.message).toBe('Movie to watch created')
  })

  // show to watch by user id
  test('Get to watch by user id', async () => {
    let response
    try {
      response = await axios.get(`http://localhost:3333/api/movies/to_watch/${userId}`)
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('Here is your movie to watch')
    expect(response.data.data).toBeDefined()
  })

  test('Delete to watch', async () => {
    let response
    try {
      response = await axios.delete(`http://localhost:3333/api/movies/to_watch/${userId}/25476`)
    } catch (error) {
      response = error
    }

    expect(response.data.code).toBe(200)
    expect(response.data.message).toBe('Movie to watch deleted')
  })
})
