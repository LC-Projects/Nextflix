// import AuthController from '#controllers/auth_controller'
// import { test } from '@japa/runner'
// import { jest } from '@jest/globals';
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// jest.mock('#models/User', () => ({
//   verifyCredentials: jest.fn(),
//   accessTokens: {
//     create: jest.fn(),
//   },
//   query: () => ({
//     where: () => ({
//       update: jest.fn(),
//     }),
//   }),
// }))

// const User = require('#models/User')

// test.group('Auth auth', () => {
//   test('login with correct credentials should return user', async ({ assert }) => {
//     const username = 'testuser'
//     const password = 'testpassword'

//     User.verifyCredentials.mockResolvedValueOnce({ id: 1, username })
//     User.accessTokens.create.mockResolvedValueOnce({ toJSON: () => ({ token: 'testtoken' }) })

//     const authController = new AuthController();
//     const response = await authController.login({
//       request: {
//         validateUsing: () => ({ email: username, password }),
//       },
//       response: {
//         status: () => ({ json: (data) => data }),
//       },
//     } as unknown as HttpContextContract)

//     assert.exists(response)
//     assert.equal(response.user.username, username)
//   })

//   test('login with incorrect credentials should throw error', async ({ assert }) => {
//     const username = 'wronguser'
//     const password = 'wrongpassword'

//     User.verifyCredentials.mockResolvedValueOnce(null)

//     const authController = new AuthController();
//     try {
//       await authController.login({
//         request: {
//           validateUsing: () => ({ email: username, password }),
//         },
//         response: {
//           status: () => ({ json: (data) => data }),
//         },
//       } as unknown as HttpContextContract)
//       assert.fail('Expected login to throw error, but it did not')
//     } catch (err) {
//       assert.exists(err)
//     }
//   })
// })