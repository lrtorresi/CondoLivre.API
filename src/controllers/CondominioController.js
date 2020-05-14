const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    //Get Condominio
    async GetCondominio(request, response) {
        try {
            const result = await connection('Condominios').select('*');
            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Não foi possivel consultar os Condominios cadastrados' });
        }
    },


    //Get condominio by ID
    async GetCondominioById(request, response) {
        try {
            const { Id } = request.params;

            //verificar se condominio existe
            const result = await connection('Condominios').where('Id', Id).select('Id').first();
            if (result == null) { return response.status(400).json({ msg: 'Não foi possivel consultar o Condominio cadastrado' }) };

            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Não foi possivel consultar o Condominio cadastrado' });
        }
    },

    async CadastrarCondominio(request, response) {
        try {
            const Id = crypto.randomBytes(5).toString('HEX'); //gerar Id criptografado
            var { Nome, CNPJ, Telefone, ContatoNome, ContatoTelefone, CondominioCode } = request.body;
            CondominioCode = CondominioCode.toUpperCase();

            //Verifica se condominio já esta cadastrado
            const validCondominio = await connection('Condominios').where('CNPJ', CNPJ).select('Id').first();
            if (validCondominio == null) {
                await connection('Condominios').insert({
                    Id, Nome, CNPJ, Telefone, ContatoNome, ContatoTelefone, CondominioCode
                })
                return response.status(201).json({ Id, Nome, CNPJ, Telefone, ContatoNome, ContatoTelefone, CondominioCode })
            }

            return response.status(401).json({ msg: 'Condominio já esta cadastrado' });
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Não foi possivel cadastrar o Condominio' });
        }
    },

    async AtualizarCondominio(request, response) {
        try {
            const { Id } = request.params;
            var { Nome, CNPJ, Telefone, ContatoNome, ContatoTelefone, CondominioCode } = request.body;

            //Verifica se condominio existe
            const validCondominio = await connection('Condominios').where('Id', Id).select('Id').first();
            if (validCondominio == null) { return response.status(401).json({ msg: 'Condominio não foi encontrado' }); }

            await connection('Condominios').where('Id', Id).update({
                Nome, CNPJ, Telefone, ContatoNome, ContatoTelefone, CondominioCode
            })
            return response.status(200).json({ Id, Nome, CNPJ, Telefone, ContatoNome, ContatoTelefone, CondominioCode })
        }
        catch (ex) {
            console.log(ex)
            return response.status(400).json({ msg: 'Não foi possivel atualizar o Condominio' });
        }
    },

    async DeletarCondominio(request, response){
        try{
            const { Id } = request.params;

            //Verifica se condominio existe
            const validCondominio = await connection('Condominios').where('Id', Id).select('Id').first();
            if (validCondominio == null) { return response.status(401).json({ msg: 'Condominio não foi encontrado' }); }

            await connection('Condominios').where('Id', Id).delete();
            return response.status(200).json({msg: 'Condominio excluido com sucesso'});
        }
        catch(ex){
            return response.status(400).json({ msg: 'Não foi possivel excluir o Condominio' });
        }
    }
}