import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projeto from 'App/Models/Projeto'
import Usuario from 'App/Models/Usuario'

export default class ProjetosController {

    public async get({response }: HttpContextContract) {

        const projetos = await Projeto.query().select(
            'projetos.id',
            'data',
            'descricao',
            'usuario',
            'usuarios.name as usuario_nome',
            'usuarios.user as usuario_user',
          )
          .leftJoin('usuarios', 'usuarios.id', 'projetos.usuario')
    
        response.status(200).send({
            data: projetos
          }) 
     
      }

      public async add({ request, response }: HttpContextContract) {
        const body = request.body()

        const usuario = await Usuario.findBy('user',body.usuario)
    
        body.usuario = usuario?.$attributes.id

        const projeto = await Projeto.create(body)
    
        if (projeto) {
          response.status(201).send({
            msg: 'Projeto cadastrado com sucesso!',
          }) 
        
        }
        else{
            response.status(400).send({
                msg: 'Projeto não cadastrado!',
              }) 
        }
    
    
      
      }

      public async update({ request, response }: HttpContextContract) {
        const body = request.body()
        const id = request.param('id')

        const usuario = await Usuario.findBy('user',body.usuario)
    
        body.usuario = usuario?.$attributes.id
    
        const projeto = await Projeto.findOrFail(id)
    
        if (projeto) {
          projeto.merge(body)
          await projeto.save()
    
            response.status(200).send({
                msg: 'Projeto atualizado com sucesso!',
              })
        }
        else{
            response.status(400).send({
                msg: 'Projeto não atualizado!',
              })
        }
    
      }

      public async delete({ request, response }: HttpContextContract) {
        const id = request.param('id')
    
        const projeto = await Projeto.findOrFail(id)
    
        if (projeto) {
        await projeto.delete()
    
            response.status(200).send({
                msg: 'Projeto deletado com sucesso!',
            })
        }
        else{
            response.status(400).send({
                msg: 'Projeto não deletado!',
            })
        }
    }





}
