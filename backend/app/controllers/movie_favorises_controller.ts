import MovieFavoris from '#models/movie_favoris'
import type { HttpContext } from '@adonisjs/core/http'
import { Database } from '@adonisjs/lucid/database'
import db from '@adonisjs/lucid/services/db'

export default class MovieFavorisesController {
  // index
  public async index({ response }: HttpContext) {
    const movieFavorises = await MovieFavoris.all()

    if (!movieFavorises) {
      return response.status(404).json({
        message: 'No movie favorises found',
        code: 404,
      })
    }

    return response.status(200).json({
      message: 'Here are your movie favorises',
      data: movieFavorises,
      code: 200,
    })
  }

  // store
  public async store({ request, response }: HttpContext) {
    const data = request.only(['user_id', 'movie_id'])

    const exist = await db
      .from('movie_favorises')
      .where('user_id', data.user_id)
      .andWhere('movie_id', data.movie_id)
      .first()

    if (exist) {
      await db
        .from('movie_favorises')
        .where('user_id', data.user_id)
        .andWhere('movie_id', data.movie_id)
        .delete()

      return response.status(200).json({
        message: 'Movie favoris deleted',
        code: 200,
      })
    }

    const movieFavoris = await MovieFavoris.create(data)

    return response.status(201).json({
      message: 'Movie favoris created',
      data: movieFavoris,
      code: 201,
    })
  }

  // destroy
  public async destroy({ params, response }: HttpContext) {
    // const movieFavoris = await MovieFavoris.query().where('user_id', params.id).andWhere('movie_id', params.movie_id).first()
    const exist = await db
      .from('movie_favorises')
      .where('user_id', params.user_id)
      .andWhere('movie_id', params.movie_id)
      .first()

    if (!exist) {
      return response.status(404).json({
        message: 'Movie favoris not found',
        code: 404,
      })
    }

    await db
      .from('movie_favorises')
      .where('user_id', params.user_id)
      .andWhere('movie_id', params.movie_id)
      .delete()

    return response.status(200).json({
      message: 'Movie favoris deleted',
      code: 200,
    })
  }

  // show
  public async show({ params, response }: HttpContext) {
    const movieFavoris = await MovieFavoris.query().where('user_id', params.id)

    if (!movieFavoris) {
      return response.status(404).json({
        message: 'Movie favoris not found',
        code: 404,
      })
    }

    return response.status(200).json({
      message: 'Here is your movie favoris',
      data: movieFavoris,
      code: 200,
    })
  }
}
