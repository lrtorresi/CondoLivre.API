const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async GetOrganizacao(request, response) {
        try {

            const result = await connection('Organizacao').select('*');
            return response.status(200).json(result)
        }
        catch (ex) {
            console.log(ex)
            return response.status(400).json({ Msg: 'Erro ao consultar organização.' })
        }
    },

    //Cadastrar Organização
    async CreateOrganizacao(request, response) {
        try {

            var { Nome, CNPJ, Email, Telefone } = request.body;
            const Id = crypto.randomBytes(5).toString('HEX'); //gerar Id criptografado
            console.log(Id, Nome, CNPJ, Email, Telefone)
            await connection('organizacao').insert({
                Id, Nome, CNPJ, Email, Telefone
            });
            return response.status(201).json({ Id, Nome, CNPJ, Email, Telefone })
        }
        catch (ex) {
            console.log(ex)
            return response.status(400).json({ Msg: 'Erro ao cadastrar organização.' })
        }
    },


    async UpdateOrganizacao(request, response) {
        try {
            const { Id } = request.params;
            var { Nome, CNPJ, Email, Telefone } = request.body;

            //Verificar se a empresa existe
            const OrganizacaoId = await connection('Organizacao').where('Id', Id).select('Id').first();
            if (OrganizacaoId == null) { return response.status(400).json({ msg: 'Organização não foi encontrada' }) };

            await connection('organizacao').where('Id', Id).update({
                Nome, CNPJ, Email, Telefone
            })
            return response.status(201).json({ Id, Nome, CNPJ, Email, Telefone })
        }
        catch (ex) {
            return response.status(400).json({ Msg: 'Erro ao atualizar organização.' })
        }
    }


}