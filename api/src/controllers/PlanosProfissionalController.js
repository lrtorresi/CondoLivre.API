const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    //Get All Planos
    async GetPlanos(request, response) {
        try {
            const result = await connection('PlanosProfissionais').select('*');
            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400), json({ msg: 'Não foi possível consultar os planos' });
        }
    },

    //Get Planos por ID
    async GetPlanosById(request, response) {
        try {
            const { Id } = request.params;

            //verifica se existe o anuncio
            const result = await connection('PlanosProfissionais').where('Id', Id).select('*').first();
            if (result == null) { return response.status(400).json({ msg: 'Não foi possível consultar os planos' }) };

            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400), json({ msg: 'Não foi possível consultar os planos' });
        }
    },

    //Cadastrar
    async CadastrarPlano(request, response) {
        try {
            var { Nome, Valor, QtdPost } = request.body;
            const Id = crypto.randomBytes(5).toString('HEX'); //gerar Id criptografado
            await connection('PlanosProfissionais').insert({
                Id, Nome, Valor, QtdPost
            })

            return response.status(201).json({ Id, Nome, Valor, QtdPost });
        }
        catch (ex) {
            return response.status(400), json({ msg: 'Não foi possível consultar os planos' });
        }
    },

    //Atualizar Plano
    async AtualizarPlano(request, response) {
        try {
            const { Id } = request.params;
            var { Nome, Valor, QtdPost } = request.body;

            //verifica se existe o anuncio
            const result = await connection('PlanosProfissionais').where('Id', Id).select('*').first();
            if (result == null) { return response.status(400).json({ msg: 'Não foi possível consultar os planos' }) };

            await connection('PlanosProfissionais').where('Id', Id).update({
                Nome, Valor, QtdPost
            })

            return response.status(200).json({ Id, Nome, Valor, QtdPost });
        }
        catch (ex) {
            return response.status(400), json({ msg: 'Não foi possível consultar os planos' });
        }
    },

    //Remover Planos
    //Get Planos por ID
    async DeletarPlano(request, response) {
        try {
            const { Id } = request.params;

            //verifica se existe o anuncio
            const result = await connection('PlanosProfissionais').where('Id', Id).select('*').first();
            if (result == null) { return response.status(400).json({ msg: 'Não foi possível consultar os planos' }) };

            await connection('PlanosProfissionais').where('Id', Id).delete();
            return response.status(200).json({ msg: 'Plano excluído com sucesso!' });
        }
        catch (ex) {
            return response.status(400), json({ msg: 'Não foi possível consultar os planos' });
        }
    },
}