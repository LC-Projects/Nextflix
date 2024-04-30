import MovieToWatch from '#models/movie_to_watch'
import type { HttpContext } from '@adonisjs/core/http'

export default class MovieToWatchController {

    // index
    public async index({ response }: HttpContext) {
        const movieToWatch = await MovieToWatch.all()

        if (!movieToWatch) {
            return response.status(404).json({
                message: 'No movie to watch found',
                code: 404
            })
        }

        return response.status(200).json({
            message: 'Here are your movie to watch',
            data: movieToWatch,
            code: 200
        })
    }


    // store
    public async store({ request, response }: HttpContext) {
        const data = request.only(['user_id', 'movie_id'])

        const movieToWatch = await MovieToWatch.create(data)

        return response.status(201).json({
            message: 'Movie to watch created',
            data: movieToWatch,
            code: 201
        })
    }


    // destroy
    public async destroy({ params, response }: HttpContext) {
        const movieToWatch = await MovieToWatch.query().where('user_id', params.id).andWhere('movie_id', params.movie_id).first()

        if (!movieToWatch) {
            return response.status(404).json({
                message: 'Movie to watch not found',
                code: 404
            })
        }

        await movieToWatch.delete()

        return response.status(200).json({
            message: 'Movie to watch deleted',
            code: 200
        })
    }


    // show
    public async show({ params, response }: HttpContext) {
        const movieToWatch = await MovieToWatch.query().where('user_id', params.id).andWhere('movie_id', params.movie_id).first()

        if (!movieToWatch) {
            return response.status(404).json({
                message: 'Movie to watch not found',
                code: 404
            })
        }

        return response.status(200).json({
            message: 'Here is your movie to watch',
            data: movieToWatch,
            code: 200
        })
    }

}