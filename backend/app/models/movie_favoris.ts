import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MovieFavoris extends BaseModel {
  public static primaryKey = 'user_id'

  @column()
  declare user_id: string

  @column()
  declare movie_id: number
}