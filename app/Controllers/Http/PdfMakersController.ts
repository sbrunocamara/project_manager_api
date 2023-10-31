import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import Env from '@ioc:Adonis/Core/Env'
import moment from 'moment'

import Usuario from 'App/Models/Usuario'
import Projeto from 'App/Models/Projeto'
import Requisito from 'App/Models/RequisitosProjeto'


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
    .first()

    let content = {

        projeto,
        requisitos
    }
    

    console.log(content.requisitos?.descricao)

    // let filename = "relatorio_"+id+'_'+moment().format('M_D_YYYY')+".pdf"
    let filename = "relatorio.pdf"

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


      doc.text(content, 100, 50)
      doc.text('teste', 100, 68)
      doc.text('teste', 100, 86)
      doc.text('teste', 100, 104)
      doc.text('teste', 100, 122)

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
