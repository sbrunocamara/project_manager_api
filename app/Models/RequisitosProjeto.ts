import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import {HasOne,hasOne} from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class RequisitosProjeto extends BaseModel {

  @hasOne(() => Usuario,{
    foreignKey: 'id',
    localKey: 'usuario'
  })

  public usuarioRequisito: HasOne<typeof Usuario>


  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public data: DateTime

  @column()
  public descricao:string

  
  @column()
  public usuario:number

  @column()
  public projeto:number

  @column()
  public codigo:string
}
