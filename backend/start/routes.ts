/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
  router.post('/logout', '#controllers/auth_controller.logout')

  router.group(() => {
    router.post('/', '#controllers/auth_controller.me')
  }).prefix('account')

  router.group(() => {
    
    router.group(() => {
      router.get('/', '#controllers/movie_favorises_controller.index')
      router.post('/', '#controllers/movie_favorises_controller.store')
      router.delete('/:id', '#controllers/movie_favorises_controller.destroy')
      router.get('/:id', '#controllers/movie_favorises_controller.show')
    }).prefix('favorises')


    // to_watch
    router.group(() => {
      router.get('/', '#controllers/movie_to_watch_controller.index')
      router.post('/', '#controllers/movie_to_watch_controller.store')
      router.delete('/:id', '#controllers/movie_to_watch_controller.destroy')
      router.get('/:id', '#controllers/movie_to_watch_controller.show')
    }).prefix('to_watch')

    router.resource('/comments', '#controllers/movie_comments_controller')
    router.get('/comments/byfilm/:id', '#controllers/movie_comments_controller.showByFilm')

  }).prefix('movies')

}).prefix('api');