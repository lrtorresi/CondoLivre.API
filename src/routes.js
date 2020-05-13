const express = require('express');
const routes = express.Router();

const OrganizacaoController = require('./controllers/OrganizacaoController');
const CategoriaController = require('./controllers/CategoriaController');

////////////////////////////////////// Organização //////////////////////////////////////
routes.post('/organizacao/newOrganizacao', OrganizacaoController.CreateOrganizacao); //Create new organização
routes.get('/organizacao', OrganizacaoController.GetOrganizacao); //Get All Organização
routes.put('/organizacao/atualizar/:Id', OrganizacaoController.UpdateOrganizacao); //Get All Organização


////////////////////////////////////// Categoria //////////////////////////////////////
routes.get('/categoria', CategoriaController.GetCategoria);
routes.get('/categoria/:Id', CategoriaController.GetCategoriaById);
routes.post('/categoria', CategoriaController.CreateCategoria);
routes.put('/categoria/:Id', CategoriaController.AtualizarCategoria);
routes.delete('/categoria/:Id', CategoriaController.DeleteCategoria);








//exportando as rotas
module.exports = routes;