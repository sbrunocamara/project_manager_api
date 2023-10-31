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

  try {
    const token = await auth.use('api').attempt(user,password, {
      expiresIn: '3 days'
      
    })

    return token
  } catch(_error) {
    return response.unauthorized('Invalid credentials')
  }
}).prefix('/api')



Route.group(() => {

//User routes
Route.post('/usuario/add', 'UsuariosController.add')
Route.put('/usuario/update/:id', 'UsuariosController.update')
Route.delete('/usuario/delete/:id', 'UsuariosController.delete')
//Projeto routes
Route.post('/projeto/add', 'ProjetosController.add')
Route.put('/projeto/update/:id', 'ProjetosController.update')
Route.delete('/projeto/delete/:id', 'ProjetosController.delete')
//Requisito routes
Route.post('/requisito/add', 'RequisitosController.add')
Route.put('/requisito/update/:id', 'RequisitosController.update')
Route.delete('/requisito/delete/:id', 'RequisitosController.delete')

}).prefix('/api').middleware(['auth:api', 'authPerm'])


Route.group(() => {

  //Get routes
  Route.get('/usuario/get', 'UsuariosController.get')
  Route.get('/projeto/get', 'ProjetosController.get')
  Route.get('/requisito/get', 'RequisitosController.get')



}).prefix('/api').middleware('auth:api')

