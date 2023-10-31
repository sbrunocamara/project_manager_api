/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('login', async ({ auth, request, response }) => {
  const user = request.input('user')
  const password = request.input('password')

  console.log(user)
  console.log(password)

  try {
    const token = await auth.use('api').attempt(user,password)
    return token
  } catch(_error) {
    console.log(_error)
    return response.unauthorized('Invalid credentials')
  }
}).prefix('/api')

Route.group(() => {

Route.post('/usuario/add', 'UsuariosController.add')
Route.get('/usuario/get', 'UsuariosController.get')
Route.put('/usuario/update/:id', 'UsuariosController.update')
Route.delete('/usuario/delete/:id', 'UsuariosController.delete')

}).prefix('/api')

