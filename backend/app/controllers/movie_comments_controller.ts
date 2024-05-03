import MovieComment from '#models/movie_comment'
import type { HttpContext } from '@adonisjs/core/http'
import { getMovieById } from '../api/tmdb.js'

export default class MovieCommentsController {

    // index
    public async index({ response }: HttpContext) {
        const movieComments = await MovieComment.all()

        if (!movieComments) {
            return response.status(404).json({
                message: 'No movie comments found',
                code: 404
            })
        }

        return response.status(200).json({
            message: 'Here are your movie comments',
            data: movieComments,
            code: 200
        })
    }


    // store
    public async store({ request, response }: HttpContext) {
        const data = request.only(['user_id', 'movie_id', 'comment', 'rating'])

        const existingComment = await MovieComment.query()
            .where('user_id', data.user_id)
            .andWhere('movie_id', data.movie_id)
            .first()

        if (existingComment) {
            return response.status(409).json({
                message: 'Movie comment already exists',
                code: 409
            })
        }

        const movieComment = await MovieComment.create(data)

        return response.status(201).json({
            message: 'Movie comment created',
            data: movieComment,
            code: 201
        })
    }


    // destroy
    public async destroy({ params, response }: HttpContext) {
        const movieComment = await MovieComment.query().where('user_id', params.id).andWhere('movie_id', params.movie_id).first()

        if (!movieComment) {
            return response.status(404).json({
                message: 'Movie comment not found',
                code: 404
            })
        }

        await movieComment.delete()

        return response.status(200).json({
            message: 'Movie comment deleted',
            code: 200
        })
    }


    // show
    public async show({ params, response }: HttpContext) {
        const movieComment = await MovieComment.query().where('user_id', params.id)

        if (!movieComment) {
            return response.status(404).json({
                message: 'Movie comment not found',
                code: 404
            })
        }

        // movie comments
        const movie_info = await Promise.all(movieComment.map(async (comment) => {
            const movie_info = await getMovieById(comment.movie_id);
            return {
                ...comment.serialize(),
                movie: {
                    id: movie_info?.id,
                    poster_path: movie_info?.poster_path,
                    backdrop_path: movie_info?.backdrop_path,
                    title: movie_info?.title,
                    original_title: movie_info?.original_title,
                }
            };
        }));

        return response.status(200).json({
            message: 'Here is your movie comment',
            data: movie_info,
            code: 200
        })
    }


    // show by film id
    public async showByFilm({ params, response }: HttpContext) {
        const movieComment = await MovieComment.query().where('movie_id', params.id)

        if (!movieComment) {
            return response.status(404).json({
                message: 'Movie comment not found',
                code: 404
            })
        }

        return response.status(200).json({
            message: 'Here is your movie comment',
            data: movieComment,
            code: 200
        })
    }

}