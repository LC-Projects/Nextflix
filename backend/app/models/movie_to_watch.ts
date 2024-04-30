import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MovieToWatch extends BaseModel {
  public static table = 'movie_to_watch'
  public static primaryKey = 'user_id'

  @column()
  declare user_id: number

  @column()
  declare movie_id: number
}