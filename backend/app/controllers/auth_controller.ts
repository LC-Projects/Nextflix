import User from '#models/user';
import auth from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        const payload = await request.validateUsing(auth);
        await User.create(payload);
        return response.status(201).json({ message: 'User created successfully', code: 201 })
    }
    
    public async login({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
    
        return response.json({ email, password })
    }
}