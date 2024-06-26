import User from '#models/user';
import { registerValidator, loginValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db';
import { randomUUID } from 'crypto';
import { getMovieById } from '../api/tmdb.js';

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        const payload = await request.validateUsing(registerValidator);
        
        try{
            await User.create({
                ...payload, id: randomUUID()
            });
        }catch(err){
            if(err.message.includes('UNIQUE constraint failed')) {
                return response.status(500).json({ message: 'Email already used', code: 500 })
            }else{
                return response.status(500).json({ message: 'Internal server error', code: 500 })
            }
        }
        return response.status(201).json({ message: 'User created successfully', code: 201 })
    }

    public async login({ request, response }: HttpContext) {
        const payload = await request.validateUsing(loginValidator);
        const user = (await User.verifyCredentials(payload.email, payload.password));
        if (!user) {
            return response.status(401).json({ message: 'Invalid credentials', code: 401 })
        }
        const token = await User.accessTokens.create(user);
        await User.query().where('id', user.id).update({ token: token.toJSON().token });

        const user_info = { ...user?.serialize(), password: undefined }
        return response.status(200).json({ message: 'User logged succesfully', code: 200, token: token, user: user_info })
    }

    public async logout({ request, response }: HttpContext) {
        const { user_id } = request.only(['user_id']);
        const user = await User.findOrFail(user_id);

        await User.accessTokens.delete(user, user.id);
        await db.from('auth_access_tokens').where('tokenable_id', user.id).delete();
        return response.status(200).json({ message: 'User logout succesfully', code: 200 })
    }

    public async me({ request, response }: HttpContext) {
        // Add favoris and to_watch
        const { user_id } = request.only(['user_id']);
        const user = await User.query().where('id', user_id).preload('movie_comments')
            .preload("movie_favoris").preload("movie_to_watch").first();
        if (!user) {
            return response.status(404).json({ message: 'User not found', code: 404 })
        }
        const user_movie_favoris = await Promise.all(user.movie_favoris.map(async (movie) => {
            const movie_info = await getMovieById(movie.movie_id);
            return movie_info;
        }));

        const user_movie_to_watch = await Promise.all(user.movie_to_watch.map(async (movie) => {
            const movie_info2 = await getMovieById(movie.movie_id);
            return movie_info2;
        }));



        const user_info = {
            ...user?.serialize(),
            password: undefined,
            movie_favoris: user_movie_favoris,
            movie_to_watch: user_movie_to_watch
        }

        return response.status(200).json({ message: 'User retrieved succesfully', code: 200, user: user_info })
    }

    // login with token
    public async loginWithToken({ request, response }: HttpContext) {
        const { token } = request.only(['token']);
        const user = await User.findBy('token', token);
        if (!user) {
            return response.status(401).json({ message: 'Invalid token', code: 401 })
        }
        return response.status(200).json({ message: 'User logged succesfully', code: 200, user: user })
    }

    // update user
    public async update({ request, response }: HttpContext) {
        const { user_id, ...payload } = request.only(['user_id','email', 'password', 'last_name', 'first_name', 'nick_name']);
        const user = await User.findOrFail(user_id);
        if (!user) {
            return response.status(404).json({ message: 'User not found', code: 404 })
        }
        try{
            await user.merge(payload).save()
        }catch(err){
            if(err.message.includes('UNIQUE constraint failed')) {
                return response.status(500).json({ message: 'Email already used', code: 500 })
            }else{
                return response.status(500).json({ message: 'Internal server error', code: 500 })
            }
        }
        return response.status(200).json({ message: 'User updated succesfully', code: 200 })
    }
}