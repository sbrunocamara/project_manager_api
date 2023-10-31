import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RequisitosProjeto extends BaseModel {
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
