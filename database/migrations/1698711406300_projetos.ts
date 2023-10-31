import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projetos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.dateTime('data', { useTz: true })

      table.string('descricao',255).notNullable()

      table.integer('usuario').unsigned().references('id').inTable('usuarios')

       
  
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
