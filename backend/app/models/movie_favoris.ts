import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MovieFavoris extends BaseModel {
  public static primaryKey = 'user_id'

  @column()
  declare user_id: number

  @column()
  declare movie_id: number
}