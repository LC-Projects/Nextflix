import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('nick_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('token').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}