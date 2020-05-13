const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async GetCategoria(request, response) {
        try {
            const result = await connection('Categorias').select('*');
            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Erro ao consultar as Categorias' });
        }
    },

    async GetCategoriaById(request, response) {
        try {
            const { Id } = request.params;
            const result = await connection('Categorias').where('Id', Id).select('*').first();

            if (result == null) { return response.status(400).json({ msg: 'Não encontrado nenhuma categoria com esse ID' }) };
            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Erro ao consultar as Categorias' });
        }
    },

    async CreateCategoria(request, response) {
        try {
            const Id = crypto.randomBytes(5).toString('HEX'); //gerar Id criptografado
            var { Categoria } = request.body;

            await connection('Categorias').insert({
                Id, Categoria
            });
            return response.status(201).json({ Id, Categoria })
        }
        catch (ex) { return response.status(400).json({ msg: 'Não foi possivel cadastrar a categoria. Tente novamente' }) };
    },

    async AtualizarCategoria(request, response){
        try{
            const {Id} = request.params;
            var {Categoria} = request.body;

            //verifica se existe a categoria
            const result = await connection('Categorias').where('Id', Id).select('Id').first();
            if (result == null) {return response.status(400).json({msg: 'Id da Categoria não encontrado'})};

            await connection('Categorias').update({
                Categoria
            });
            return response.status(200).json(Categoria);
        }
        catch(ex){return response.status(400).json({msg: 'Não foi possivel atualizar a categoria. Tente novamente'})};
    },

    async DeleteCategoria(request, response){
        try{
            const {Id} = request.params;

            //verifica se existe a categoria
            const result = await connection('Categorias').where('Id', Id).select('Id').first();
            if (result == null) {return response.status(400).json({msg: 'Id da Categoria não encontrado'})};

            await connection('Categorias').where('Id', Id).delete();
            return response.status(200).json({msg: 'Categoria excluída com sucesso'});
        }
        catch(ex){return response.status(400).json({msg: 'Não foi possivel atualizar a categoria. Tente novamente'})};
    }
}