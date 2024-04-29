import vine from '@vinejs/vine'

export const registerValidator =  vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(8),
        first_name: vine.string().optional(),
        last_name: vine.string().optional(),
        nick_name: vine.string().optional(),
    })
);

export const loginValidator =  vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(8),
    })
);