import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Usuario from 'App/Models/Usuario'

export default class extends BaseSeeder {
  public async run () {
   
    await Usuario.createMany([
      {
        nome: 'Administrador',
        usuario: 'admin',
        senha: '7c4a8d09ca3762af61e59520943dc26494f8941b',
        privilegio: 1,
      },
      {
        nome: 'Usuário',
        usuario: 'user',
        senha: '7c4a8d09ca3762af61e59520943dc26494f8941b',
        privilegio: 2,
      },
    ])

  }
}