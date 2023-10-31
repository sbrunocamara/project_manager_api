import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'grupos_usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

       
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('descricao',255).notNullable()
          
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
