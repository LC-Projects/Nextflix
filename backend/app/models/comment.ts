import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Comment extends BaseModel {
  @column()
  declare user_id: number

  @column()
  declare movie_id: number

  @column()
  declare comment: string | null

  @column()
  declare rating: number
}