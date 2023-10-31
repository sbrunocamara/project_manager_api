import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TokensController {

    public async get() {

        const tokens = await Database.query().select(
        'usuarios.name',
        'usuarios.user',
        'usuarios.privilegio',
        'api_tokens.token',
        'api_tokens.created_at',
        'api_tokens.expires_at'
        )
        .from('api_tokens')
        .leftJoin('usuarios', 'api_tokens.user_id', 'usuarios.id')
    
        return tokens
     
     
      }
}
