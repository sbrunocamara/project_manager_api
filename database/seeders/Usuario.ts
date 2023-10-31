import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Usuario from 'App/Models/Usuario'

export default class extends BaseSeeder {
  public async run () {
   
    await Usuario.createMany([
      {
        name: 'Administrador',
        user: 'admin',
        password: '123456',
        privilegio: 1,
      },
      {
        name: 'Usuário',
        user: 'user',
        password: '123456',
        privilegio: 2,
      },
    ])

  }
}