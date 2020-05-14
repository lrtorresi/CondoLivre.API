const express = require('express');
const routes = express.Router();

const OrganizacaoController = require('./controllers/OrganizacaoController');
const CategoriaController = require('./controllers/CategoriaController');
const UserController = require('./controllers/UserController');
const CondominioController = require('./controllers/CondominioController');
const AnuncioController = require('./controllers/AnuncioController');


/* #region  ORGANIZAÇÃO */
////////////////////////////////////// Organização //////////////////////////////////////
routes.post('/organizacao/newOrganizacao', OrganizacaoController.CreateOrganizacao); //Create new organização
routes.get('/organizacao', OrganizacaoController.GetOrganizacao); //Get All Organização
routes.put('/organizacao/atualizar/:Id', OrganizacaoController.UpdateOrganizacao); //Get All Organização
/* #endregion */

/* #region  CATEGORIA */
////////////////////////////////////// Categoria //////////////////////////////////////
routes.get('/categoria', CategoriaController.GetCategoria);
routes.get('/categoria/:Id', CategoriaController.GetCategoriaById);
routes.post('/categoria', CategoriaController.CreateCategoria);
routes.put('/categoria/:Id', CategoriaController.AtualizarCategoria);
routes.delete('/categoria/:Id', CategoriaController.DeleteCategoria);
/* #endregion */

/* #region  USUARIOS */
////////////////////////////////////// USER //////////////////////////////////////
routes.get('/user', UserController.GetUsers);
routes.get('/user/:Id', UserController.GetUserById);
routes.post('/user', UserController.CreateUser);
routes.put('/user/:Id', UserController.AtualizarUser);
routes.delete('/user/:Id', UserController.DeleteUser);
/* #endregion */

/* #region  CONDOMÍNIOS */
////////////////////////////////////// CONDOMÍNIOS //////////////////////////////////////
routes.get('/Condominio', CondominioController.GetCondominio);
routes.get('/Condominio/:Id', CondominioController.GetCondominioById);
routes.post('/Condominio', CondominioController.CadastrarCondominio);
routes.put('/Condominio/:Id', CondominioController.AtualizarCondominio);
routes.delete('/Condominio/:Id', CondominioController.DeletarCondominio);
/* #endregion */

/* #region  ANÚNCIOS */
////////////////////////////////////// ANÚNCIOS //////////////////////////////////////
routes.get('/Anuncio', AnuncioController.GetAnuncios);
routes.get('/Anuncio/:Id', AnuncioController.GetAnunciosByID);
routes.post('/Anuncio', AnuncioController.CadastrarAnuncio);
routes.put('/Anuncio/:Id', AnuncioController.AtualizarAnuncio);
routes.delete('/Anuncio/:Id', AnuncioController.DeletarAnuncio);
/* #endregion */







//exportando as rotas
module.exports = routes;