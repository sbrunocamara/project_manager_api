import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import Requisito from 'App/Models/RequisitosProjeto'

export default class RequisitosController {

    public async get({response,request }: HttpContextContract) {
      const id = request.param('id')
        const requisito = await Requisito.query().select(
            'requisitos_projetos.id',
            'requisitos_projetos.data',
            'requisitos_projetos.descricao',
            'requisitos_projetos.usuario',
            'requisitos_projetos.projeto',
            'requisitos_projetos.codigo'
          ).preload('usuarioRequisito').where('requisitos_projetos.projeto',id)
        
    
        response.status(200).send({
            data: requisito
          }) 
     
      }

      public async add({ request, response }: HttpContextContract) {
        const body = request.body()

        const usuario = await Usuario.findBy('user',body.usuario)
    
        body.usuario = usuario?.$attributes.id

        const requisito = await Requisito.create(body)
    
        if (requisito) {
          response.status(201).send({
            msg: 'Requisito cadastrado com sucesso!',
          }) 
        
        }
        else{
            response.status(400).send({
                msg: 'Requisito não cadastrado!',
              }) 
        }
    
    
      
      }

      public async update({ request, response }: HttpContextContract) {
        const body = request.body()
        const id = request.param('id')

        const usuario = await Usuario.findBy('user',body.usuario)
    
        body.usuario = usuario?.$attributes.id
    
        const requisito = await Requisito.findOrFail(id)
    
        if (requisito) {
            requisito.merge(body)
          await requisito.save()
    
            response.status(200).send({
                msg: 'Requisito atualizado com sucesso!',
              })
        }
        else{
            response.status(400).send({
                msg: 'Requisito não atualizado!',
              })
        }
    
      }


      public async delete({ request, response }: HttpContextContract) {
        const id = request.param('id')
    
        const requisito = await Requisito.findOrFail(id)
    
        if (requisito) {
        await requisito.delete()
    
            response.status(200).send({
                msg: 'Requisito deletado com sucesso!',
            })
        }
        else{
            response.status(400).send({
                msg: 'Requisito não deletado!',
            })
        }
    }



    
}
