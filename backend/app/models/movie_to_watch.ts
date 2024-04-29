import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MovieToWatch extends BaseModel {
  @column()
  declare user_id: number

  @column()
  declare movie_id: number
}