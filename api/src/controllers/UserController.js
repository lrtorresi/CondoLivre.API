const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    //Get Usuarios
    async GetUsers(request, response) {

        try {
            const result = await connection('Users').select('*');
            return response.status(200).json(result);
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Não foi possivel consultar os usuários.' });
        }
    },

    //Get Usuario por ID
    async GetUserById(request, response) {
        try {
            const { Id } = request.params;

            //verificar se existe este usuario
            const result = await connection('Users').where('Id', Id).select('Id').first();
            if (result == null) { return response.status(400).json({ msg: 'Não foi possivel consultar os usuários.' }) };

            return response.status(200).json(result)
        }
        catch (ex) {
            return response.status(400).json({ msg: 'Não foi possivel consultar os usuários.' });
        }
    },

    //Cadastrar novo usuario
    async CreateUser(request, response){
        try{
            const Id = crypto.randomBytes(5).toString('HEX'); //gerar Id criptografado
            var {Nome, Email, Telefone, Senha, QtdAnuncios, QtdAnunciosUtilizados, CondominioCode, PlanoId} = request.body;
            CondominioCode = CondominioCode.toUpperCase();
           
            //Validando campos
            if(QtdAnuncios == null){QtdAnuncios = 1}; 
            if(QtdAnunciosUtilizados == null){QtdAnunciosUtilizados = 0};

            //Validar o CondominioCode
            const validCondominioCode = await connection('Condominios').where('CondominioCode', CondominioCode).select('Id').first();
            if(validCondominioCode == null) {return response.status(400).json({msg: 'Não foi possivel cadastrar este usuário, código de Condominio não validado'})};

            //Verifica se Usuario ja tem cadastro
            const validUser = await connection('Users').where('Email', Email).orWhere('Telefone', Telefone).select('Id').first();            
            if(validUser == null) {
                await connection('Users').insert({
                    Id, Nome, Email, Telefone, Senha, QtdAnuncios, QtdAnunciosUtilizados, CondominioCode, PlanoId
                });
                return response.status(201).json({Id, Nome, Email, Telefone, Senha, QtdAnuncios, QtdAnunciosUtilizados, CondominioCode, PlanoId});
            }
            else{
                return response.status(401).json({msg: 'Usuário já possui cadastro'});
            }
        }
        catch(ex){
            console.log(ex)
            return response.status(400).json({msg: 'Não foi possivel cadastrar este usuário'});
        }
    },

    //Atualizar dados do Usuario
    async AtualizarUser(request, response){
        try{
            const {Id} = request.params;
            var {Nome, Email, Telefone, Senha, QtdAnuncios, QtdAnunciosUtilizados, CondominioCode, PlanoId} = request.body;
            CondominioCode = CondominioCode.toUpperCase();

            //verifica se usuario existe
            const result = await connection('Users').where('Id', Id).select('Id').first();
            if (result == null) {return response.status(400).json({ msg: 'Não foi possivel consultar os usuários.' })};

            await connection('Users').where('Id', Id).update({
                Nome, Email, Telefone, Senha, QtdAnuncios, QtdAnunciosUtilizados, CondominioCode, PlanoId
            })
            return response.status(200).json({Id, Nome, Email, Telefone, Senha, QtdAnuncios, QtdAnunciosUtilizados, CondominioCode, PlanoId});
        }
        catch(ex){
            console.log(ex)
            return response.status(400).json({msg: 'Não foi possivel atualizar o usuário'});
        }
    },

    //Excluir usuario
    async DeleteUser(request, response){
        try{
            const {Id} = request.params;

            //verifica se usuario existe
            const result = await connection('Users').where('Id', Id).select('Id').first();
            if (result == null) {return response.status(400).json({ msg: 'Não foi possivel consultar os usuários.' })};

            await connection('Users').where('Id', Id).delete();
            return response.status(200).json({msg: 'Usuário excluido com sucesso.'});
        }
        catch(ex){
            return response.status(400).json({msg: 'Não foi possivel excluir o usuário'}); 
        }
    }
}