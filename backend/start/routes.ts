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
  router.post('/login_with_token', '#controllers/auth_controller.loginWithToken')
  router.post('/logout', '#controllers/auth_controller.logout')

  router.group(() => {
    router.post('/', '#controllers/auth_controller.me')
    router.put('/update', '#controllers/auth_controller.update')	
  }).prefix('account')

  router.group(() => {
    
    router.group(() => {
      router.get('/', '#controllers/movie_favorises_controller.index')
      router.post('/', '#controllers/movie_favorises_controller.store')
      router.delete('/:user_id/:movie_id', '#controllers/movie_favorises_controller.destroy')
      router.get('/:id', '#controllers/movie_favorises_controller.show')
    }).prefix('favorises')


    // to_watch
    router.group(() => {
      router.get('/', '#controllers/movie_to_watch_controller.index')
      router.post('/', '#controllers/movie_to_watch_controller.store')
      router.delete('/:user_id/:movie_id', '#controllers/movie_to_watch_controller.destroy')
      router.get('/:id', '#controllers/movie_to_watch_controller.show')
    }).prefix('to_watch')
    
    //comments
    router.group(() => {
      router.get('/', '#controllers/movie_comments_controller.index')
      router.post('/', '#controllers/movie_comments_controller.store')
      router.delete('/:user_id/:movie_id', '#controllers/movie_comments_controller.destroy')
      router.get('/:id', '#controllers/movie_comments_controller.show')
      router.get('/byfilm/:id', '#controllers/movie_comments_controller.showByFilm')
    }).prefix('comments');

  }).prefix('movies')

}).prefix('api');