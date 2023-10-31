import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requisitos_projetos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('data', { useTz: true })

      table.string('descricao',255).notNullable()

      table.integer('projeto').unsigned().references('id').inTable('projetos')

      table.integer('usuario').unsigned().references('id').inTable('usuarios')

      table.string('codigo',255).notNullable()
  
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
