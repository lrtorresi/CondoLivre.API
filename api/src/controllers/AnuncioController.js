const connection = require('../database/connection');
const crypto = require('crypto');
const moment = require('moment');
const uploadImage = require('../services/Cloudinary/cloudinary');

module.exports = {

    async GetAnuncios(request, response) {
        try {
            const result = await connection('Anuncios').select('*');
            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Erro ao consultar os anúncios' });
        }
    },

    async GetAnunciosByID(request, response) {
        try {
            const Id = request.params;

            //Verifica se anuncio existe
            const result = await connection('Anuncios').where('Id', Id).select('*');
            if (result == null) { return response.status(401).json({ msg: 'Erro ao consultar os anúncios' }) };

            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Erro ao consultar os anúncios' });
        }
    },

    async CadastrarAnuncio(request, response) {
        try {
            const Id = crypto.randomBytes(5).toString('HEX'); //gerar Id criptografado
            var { Titulo, Descricao, preco, Foto1, Foto2, Foto3, CategoriaId, CondominioCode, UserId } = request.body;
            CondominioCode = CondominioCode.toUpperCase();
            var DataAnuncio = moment().utc().format('YYYY/MM/DD');

            //verificar se o usuario pode fazer anuncios
            const _qtdAnuncios = await connection('Users').where('Id', UserId).select('QtdAnuncios');
            const _qtdAnunciosUtilizados = await connection('Users').where('Id', UserId).select('QtdAnunciosUtilizados');
            /* const validAnuncio = await connection('Users').where('Id', UserId).andWhere('QtdAnunciosUtilizados', '>', 'QtdAnuncios').select('*'); */
            console.log(_qtdAnuncios[0].QtdAnuncios, _qtdAnunciosUtilizados[0].QtdAnunciosUtilizados)
            if (_qtdAnunciosUtilizados[0].QtdAnunciosUtilizados >= _qtdAnuncios[0].QtdAnuncios) {
                return response.status(401).json({ msg: 'Usuario já utilizou o limite de anuncios disponiveis' });
            }
           
            //Enviando foto para o CLoud
            if (Foto1.length > 0) { Foto1 = await uploadImage.UploadImage(Foto1) };
            if (Foto2.length > 0) { Foto2 = await uploadImage.UploadImage(Foto2) };
            if (Foto3.length > 0) { Foto3 = await uploadImage.UploadImage(Foto3) };

            await connection('Anuncios').insert({
                Id, Titulo, Descricao, preco, Foto1, Foto2, Foto3, DataAnuncio, CategoriaId, CondominioCode, UserId
            })

            //atualizar quantidade de anuncios do usuario
            var result = await connection('Users').where('Id', UserId).select('QtdAnunciosUtilizados'); //Pega a quantidade de anuncios utilizados
            var qtdAnuncios = result[0].QtdAnunciosUtilizados; // Passa o valor da quantidade para a variavel
            await connection('Users').where('Id', UserId).update('QtdAnunciosUtilizados', ++qtdAnuncios);

            return response.status(201).json({ Id, Titulo, Descricao, preco, Foto1, Foto2, Foto3, DataAnuncio, CategoriaId, CondominioCode, UserId })
        }
        catch (ex) {
            console.log(ex)
            return response.status(400).json({ msg: 'Erro ao cadastrar novo anúncio' });
        }
    },

    async AtualizarAnuncio(request, response) {
        try {
            const Id = request.params;
            var { Titulo, Descricao, preco, Foto1, Foto2, Foto3, CategoriaId, CondominioCode, UserId } = request.body;
            CondominioCode = CondominioCode.toUpperCase();
            var DataAnuncio = moment().utc().format('YYYY/MM/DD');

            //verifica se existe o anuncio
            const validAnuncio = await connection('Anuncios').where('Id', Id).select('Id').first();
            if (validAnuncio == null) { return response.status(401).json({ msg: 'Anuncio não foi encontrado' }) };

            await connection('Anuncios').where('Id', Id).update({
                Titulo, Descricao, preco, Foto1, Foto2, Foto3, DataAnuncio, CategoriaId, CondominioCode, UserId
            })
            return response.status(200).json({ Titulo, Descricao, preco, Foto1, Foto2, Foto3, DataAnuncio, CategoriaId, CondominioCode, UserId });
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Erro ao atualizar anúncio' });
        }
    },

    async DeletarAnuncio(request, response) {
        try {
            const Id = request.params;

            //verifica se existe o anuncio
            const validAnuncio = await connection('Anuncios').where('Id', Id).select('Id').first();
            if (validAnuncio == null) { return response.status(401).json({ msg: 'Anuncio não foi encontrado' }) };

            await connection('Anuncios').where('Id', Id).delete()
            return response.status(200).json({ msg: 'Anúncio excluído com sucesso.' });
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Erro ao deletar anúncio' });
        }
    }
}