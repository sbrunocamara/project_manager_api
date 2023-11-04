
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async get({response }: HttpContextContract) {
    const usuarios = await Usuario.query().select(
      'usuarios.name',
      'usuarios.id',
      'usuarios.user',
      'usuarios.privilegio',
      'usuarios.created_at',
      'usuarios.updated_at'
    ).preload('grupo')

    response.status(200).send({
        data: usuarios
      }) 
 
  }
  public async getById({request,response }: HttpContextContract) {
    const id = request.param('id')
    const usuarios = await Usuario.query().select(
      'usuarios.name',
      'usuarios.user',
      'usuarios.privilegio',
      'usuarios.created_at',
      'usuarios.updated_at'
    ).preload('grupo').where('id',id)

    response.status(200).send({
        data: usuarios
      }) 
 
  }
  public async add({ request, response }: HttpContextContract) {
    const body = request.body()

    const usuario = await Usuario.create(body)

    if (usuario) {
     
      response.status(201).send({
        msg: 'Usuário cadastrado com sucesso!',
      }) 
    
    }
    else{
        response.status(400).send({
            msg: 'Usuario não cadastrado!',
          }) 
    }


  
  }

  public async update({ request, response }: HttpContextContract) {
    const body = request.body()
    const id = request.param('id')

    const usuario = await Usuario.findOrFail(id)

    if (usuario) {
      usuario.merge(body)
      await usuario.save()

        response.status(200).send({
            msg: 'Usuário atualizado com sucesso!',
          })
    }
    else{
        response.status(400).send({
            msg: 'Usuário não atualizado!',
          })
    }

  }

    public async delete({ request, response }: HttpContextContract) {
        const id = request.param('id')
    
        const usuario = await Usuario.findOrFail(id)
    
        if (usuario) {
        await usuario.delete()
    
            response.status(200).send({
                msg: 'Usuário deletado com sucesso!',
            })
        }
        else{
            response.status(400).send({
                msg: 'Usuário não deletado!',
            })
        }
    }
}
