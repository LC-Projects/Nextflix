import User from '#models/user';
import { registerValidator, loginValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db';
import { randomUUID } from 'crypto';

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        const payload = await request.validateUsing(registerValidator);
        await User.create({
            ...payload, id: randomUUID()
        });
        return response.status(201).json({ message: 'User created successfully', code: 201 })
    }
    
    public async login({ request, response }: HttpContext) {
        const payload = await request.validateUsing(loginValidator);
        const user = (await User.verifyCredentials(payload.email, payload.password));
        if (!user) {
            return response.status(401).json({ message: 'Invalid credentials', code: 401 })
        }
        const token = await User.accessTokens.create(user);
        const user_comments = await User.query().where('id', user.id).preload('comments').first();
        const user_info = {...user_comments?.serialize(), password: undefined}
        return response.status(200).json({ message: 'User logged succesfully', code: 200, token: token, user: user_info })
    }

    public async logout({ request, response }: HttpContext) {
        const { user_id } = request.only(['user_id']);
        const user = await User.findOrFail(user_id);
        
        await User.accessTokens.delete(user, user.id);
        await db.from('auth_access_tokens').where('tokenable_id', user.id).delete();
        return response.status(200).json({ message: 'User logout succesfully', code: 200 })
    }
}