import MovieFavoris from '#models/movie_favoris'
import type { HttpContext } from '@adonisjs/core/http'

export default class MovieFavorisesController {

    // index
    public async index({ response }: HttpContext) {
        const movieFavorises = await MovieFavoris.all()

        if (!movieFavorises) {
            return response.status(404).json({
                message: 'No movie favorises found',
                code: 404
            })
        }

        return response.status(200).json({
            message: 'Here are your movie favorises',
            data: movieFavorises,
            code: 200
        })
    }



    // store
    public async store({ request, response }: HttpContext) {
        const data = request.only(['user_id', 'movie_id'])
        
        const exists = await MovieFavoris.query()
        .where('user_id', data.user_id)
        .andWhere('movie_id', data.movie_id)
        .first();
        
        if (exists) {
            console.log('exists', exists);
            exists.delete();
            return response.status(200).json({
                message: 'Movie favoris deleted',
                code: 200
            });
        }

        const movieFavoris = await MovieFavoris.create(data)

        return response.status(201).json({
            message: 'Movie favoris created',
            data: movieFavoris,
            code: 201
        })
    }


    // destroy
    public async destroy({ params, response }: HttpContext) {
        const movieFavoris = await MovieFavoris.query().where('user_id', params.id).andWhere('movie_id', params.movie_id).first()

        if (!movieFavoris) {
            return response.status(404).json({
                message: 'Movie favoris not found',
                code: 404
            })
        }

        await movieFavoris.delete()

        return response.status(200).json({
            message: 'Movie favoris deleted',
            code: 200
        })
    }


    // show
    public async show({ params, response }: HttpContext) {
        const movieFavoris = await MovieFavoris.query().where('user_id', params.id)

        if (!movieFavoris) {
            return response.status(404).json({
                message: 'Movie favoris not found',
                code: 404
            })
        }

        return response.status(200).json({
            message: 'Here is your movie favoris',
            data: movieFavoris,
            code: 200
        })
    }

}