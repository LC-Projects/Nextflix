
export interface  AccountI{
  message: string
  code: number
  user: User
}

interface User {
  id: string
  firstName: string
  lastName: string
  nickName: any
  email: string
  createdAt: string
  updatedAt: string
  movie_comments: MovieComment[]
  movie_favoris: any[]
  movie_to_watch: any[]
}

interface MovieComment {
  userId: string
  movieId: number
  comment: string
  rating: number
}

