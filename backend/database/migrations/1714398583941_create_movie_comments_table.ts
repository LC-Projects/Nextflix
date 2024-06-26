import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movie_comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('user_id')
      table.integer('movie_id')
      table.text('comment').nullable()
      table.smallint('rating').defaultTo(0)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}