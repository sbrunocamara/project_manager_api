import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import Env from '@ioc:Adonis/Core/Env'
import moment from 'moment'

import Usuario from 'App/Models/Usuario'
import Projeto from 'App/Models/Projeto'
import Requisito from 'App/Models/RequisitosProjeto'
import { Buffer } from 'buffer'


export default class PdfMakersController {
  public async generate({ request, response }: HttpContextContract) {

    const body = request.body()
    const id = request.param('id')

    let projeto = await Projeto
    .query()
    .select()
    .where('id',id)
    .first()

    let requisitos = await Requisito
    .query()
    .select()
    .where('projeto',id)
    

    let content = {

        projeto,
        requisitos
    }
    

    let filename = "relatorio_"+id+'_'+moment().format('M_D_YYYY')+".pdf"


    let pdf = this.pdfWriter(filename,content)


    response.status(200).send({
     "base64": await pdf,
     "URL": Env.get('URL_FILES')+filename,
    })


  }

  public async pdfWriter(filename,content){

    const PDFDocument = require('pdfkit')

    const pdfBuffer = await new Promise((resolve) => {
      const doc = new PDFDocument()

      doc.fontSize(18);
      doc.text('Projeto', 300, 30)
      doc.fontSize(12);
      doc.text('ID:  '+content.projeto.id, 100, 68)
      doc.text('Data:  '+content.projeto.data.day+'/'+content.projeto.data.month+'/'+content.projeto.data.year, 100, 86)
      doc.text('Descricão:  '+content.projeto.descricao, 100, 104)
   

      let line = 144
      doc.fontSize(18);
      doc.text('Requisitos', 290, line)
      line = line + 18
      doc.fontSize(12);
      content.requisitos.forEach(element => {

        line = line + 18
        
        doc.text('Código:  '+element.codigo, 100, line)
        line = line + 18
        doc.text('Data:  '+element.data.day+'/'+element.data.month+'/'+element.data.year, 100, line)
        line = line + 18
        doc.text('Descricão:  '+element.descricao, 100, line)
        line = line + 18
        doc.text('--------------------------------------------------------------------------------------------------------------', 100, line)

      
      }); 

        

    

      doc.end()

      //Finalize document and convert to buffer array
      let buffers = []
      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        let pdfData = new Uint8Array(Buffer.concat(buffers))
        resolve(pdfData)
      })
    })


    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(pdfBuffer as any )))

    fs.open(Env.get('FILE_DIR')+filename, 'w', function (err, file) {
      if (err) throw err
      console.log('Saved!')
    })

    fs.writeFile(
      Env.get('FILE_DIR')+filename,
      base64String,
      { encoding: 'base64' },
      function (err) {
        console.log('File created')
      }
    )

    return base64String

  }
}
