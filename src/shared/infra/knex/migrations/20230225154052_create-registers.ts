import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('registers', (table) => {
    table.uuid('id').primary()
    table.uuid('product_id').notNullable()
    table
      .foreign('product_id')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
    table.integer('amount').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('registers')
}
