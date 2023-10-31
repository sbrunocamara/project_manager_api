import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GruposUsuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public descricao:string


  
}
