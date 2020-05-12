const express = require('express');
const routes = express.Router();

const OrganizacaoController = require('./controllers/OrganizacaoController');

////////////////////////////////////// Organização //////////////////////////////////////
routes.post('/organizacao/newOrganizacao', OrganizacaoController.CreateOrganizacao); //Create new organização
routes.get('/organizacao', OrganizacaoController.GetOrganizacao); //Get All Organização
routes.put('/organizacao/atualizar/:Id', OrganizacaoController.UpdateOrganizacao); //Get All Organização

//exportando as rotas
module.exports = routes;