export interface AuthI {
    token: string | null,
    email: string | null
    password: string | null
    loading: boolean
    error: string | null
    reload: boolean
}

export interface AuthenticationI {
    message: string
    code: number
    token: {
        type: string
        name: any
        token: string
        abilities: string[]
        lastUsedAt: any
        expiresAt: any
    }
    user: {
        id: string
        firstName: string
        lastName: string
        nickName: any
        email: string
        createdAt: string
        updatedAt: string
        comments: {
            userId: string
            movieId: number
            comment: string
            rating: number
        }[]
    }
}