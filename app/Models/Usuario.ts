import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import {
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import GruposUsuario from './GruposUsuario'

export default class Usuario extends BaseModel {

  @hasOne(() => GruposUsuario,{
    foreignKey: 'id',
    localKey: 'privilegio'
  })

  public grupo: HasOne<typeof GruposUsuario>

  @column({ isPrimary: true })
  public id: number

  @column()
  public user: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (usuario: Usuario) {
    if (usuario.$dirty.password) {
      usuario.password = await Hash.make(usuario.password)
    }
  }

  @column()
  public privilegio:number

  @column()
  public name:string
}
