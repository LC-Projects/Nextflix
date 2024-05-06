import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MovieComment extends BaseModel {
  public static primaryKey = 'user_id'
  
  @column()
  declare user_id: number

  @column()
  declare movie_id: number

  @column()
  declare comment: string | null

  @column()
  declare rating: number
}