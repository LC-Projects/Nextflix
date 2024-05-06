import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import MovieComment from './movie_comment.js'
import * as relations from '@adonisjs/lucid/types/relations';
import MovieFavoris from './movie_favoris.js'
import MovieToWatch from './movie_to_watch.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare first_name: string | null

  @column()
  declare last_name: string | null

  @column()
  declare nick_name: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare token: string


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => MovieComment, {
    localKey: 'id',
    foreignKey: 'user_id'
  })

  declare movie_comments: relations.HasMany<typeof MovieComment>

  @hasMany(() => MovieFavoris, {
    localKey: 'id',
    foreignKey: 'user_id'
  })

  declare movie_favoris: relations.HasMany<typeof MovieFavoris>

  @hasMany(() => MovieToWatch, {
    localKey: 'id',
    foreignKey: 'user_id'
  })

  declare movie_to_watch: relations.HasMany<typeof MovieToWatch> 
}