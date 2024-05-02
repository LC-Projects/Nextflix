import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MovieToWatch extends BaseModel {
  public static table = 'movie_to_watch'
  public static primaryKey = 'user_id'

  @column()
  declare user_id: string

  @column()
  declare movie_id: number
}