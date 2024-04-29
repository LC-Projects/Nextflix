import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movie_to_watches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id')
      table.integer('movie_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}