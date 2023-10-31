import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import GruposUsuario from 'App/Models/GruposUsuario'

export default class extends BaseSeeder {
  public async run () {
    
    await GruposUsuario.createMany([
      {
        descricao: 'Administrador',
      },
      {
        descricao: 'Usuário',
      },
    ])
  }
}
