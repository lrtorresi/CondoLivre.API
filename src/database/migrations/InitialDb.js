
exports.up = function (knex) {
  return knex.schema

    /* #region  Organização */
    .createTable('Organizacao', function (table) {
      table.string('Id').primary();
      table.string('Nome', 100).notNullable();
      table.bigInteger('CNPJ').notNullable();
      table.string('Email', 100).notNullable();
      table.biginteger('Telefone').notNullable();
    })
    /* #endregion */

    /* #region  Categorias */
    .createTable('Categorias', function (table) {
      table.string('Id').primary();
      table.string('Categoria', 100).notNullable();
    })
    /* #endregion */

    /* #region  Planos Profissionais */
    .createTable('PlanosProfissionais', function (table) {
      table.string('Id').primary();
      table.string('Nome', 100).notNullable();
      table.decimal('Valor', 14, 2).notNullable();
      table.integer('QtdPost', 255).notNullable();
    })
    /* #endregion */

    /* #region  Condominios */
    .createTable('Condominios', function (table) {
      table.string('Id').primary();
      table.string('Nome', 100).notNullable();
      table.bigInteger('CNPJ').notNullable();
      table.bigInteger('Telefone').notNullable();
      table.string('ContatoNome', 100).notNullable();
      table.bigInteger('ContatoTelefone').notNullable();
      table.string('CondominioCode', 100).notNullable();
    })
    /* #endregion */

    /* #region  Users */
    .createTable('Users', function (table) {
      table.string('Id').primary();
      table.string('Nome', 100).notNullable();
      table.string('Email', 100).notNullable();
      table.bigInteger('Telefone').notNullable();
      table.string('Senha', 100).notNullable();
      table.integer('QtdAnuncios', 255).notNullable();
      table.integer('QtdAnunciosUtilizados', 255).notNullable();

      table.string('CondominioCode', 100).notNullable();

      table.string('PlanoId').notNullable();
      table.foreign('PlanoId').references('Id').inTable('PlanosProfissionais');
    })
    /* #endregion */

    /* #region  Anuncios */
    .createTable('Anuncios', function (table) {
      table.string('Id').primary();
      table.string('Titulo', 300).notNullable();
      table.string('Descricao').notNullable();
      table.decimal('Preco', 14, 2).notNullable();
      table.string('Foto1');
      table.string('Foto2');
      table.string('Foto3');
      table.date('DataAnuncio').notNullable();

      table.string('CategoriaId').notNullable();
      table.foreign('CategoriaId').references('Id').inTable('Categorias');

      table.string('CondominioCode', 100).notNullable();

      table.string('UserId').notNullable();
      table.foreign('UserId').references('Id').inTable('Users');
    });
  /* #endregion */

};

exports.down = function (knex) {
  knex.schema.dropTable('Organizacao');
  knex.schema.dropTable('Categorias');
  knex.schema.dropTable('PlanosProfissionais');
  knex.schema.dropTable('Condominios');
  knex.schema.dropTable('Users');
  knex.schema.dropTable('Anuncios');
};
