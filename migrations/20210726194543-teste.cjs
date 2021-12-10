'use strict';
require('dotenv').config()
const schema = process.env.DB_SCHEMA;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint(
      `${schema}.produto`,
      {
        type: "FOREIGN KEY",
        name: 'tipo_fk',
        fields: ['idtipo'],
        references: {table: 'tipo', field: 'idtipo'}
      }
    );
    await queryInterface.addConstraint(
      `${schema}.comanda`,
      {
        type: "FOREIGN KEY",
        name: 'garcom_fk',
        fields: ['idgarcom'],
        references: {table: 'garcom', field: 'idgarcom'}
      }
    );
    await queryInterface.addConstraint(
      `${schema}.item`,
      {
        type: "FOREIGN KEY",
        name: "comanda_fk",
        fields: ['idcomanda'],
        references: {table: 'comanda', field: 'idcomanda'}
      }
    );
    await queryInterface.addConstraint(
      `${schema}.item`,
      {
        type: "FOREIGN KEY",
        name: "produto_fk",
        fields: ['idproduto'],
        references: {table: 'produto', field: 'idproduto'}
      }
    );
    await queryInterface.addConstraint(
      `${schema}.pagamento`,
      {
        type: "FOREIGN KEY",
        name: "comanda_fk",
        fields: ['idcomanda'],
        references: {table: 'comanda', field: 'idcomanda'}
      }
    );
    await queryInterface.addConstraint(
      `${schema}.pagamento`,
      {
        type: "FOREIGN KEY",
        name: "tppag_fk",
        fields: ['idtppag'],
        references: {table: 'tppagamento', field: 'idtppag'}
      }
    );
    await queryInterface.addConstraint(
      `${schema}.removido`,
      {
        type: "FOREIGN KEY",
        name: "comanda_fk",
        fields: ['idcomanda'],
        references: {table: 'comanda', field: 'idcomanda'}
      }
    );
    await queryInterface.addConstraint(
      `${schema}.removido`,
      {
        type: "FOREIGN KEY",
        name: "produto_fk",
        fields: ['idproduto'],
        references: {table: 'produto', field: 'idproduto'}
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(`${schema}.produto`, 'tipo_fk')
    await queryInterface.removeConstraint(`${schema}.pagamento`, 'comanda_fk')
    await queryInterface.removeConstraint(`${schema}.pagamento`, 'tppag_fk')
    await queryInterface.removeConstraint(`${schema}.item`, 'produto_fk')
    await queryInterface.removeConstraint(`${schema}.item`, 'comanda_fk')
    await queryInterface.removeConstraint(`${schema}.removido`, 'comanda_fk')
    await queryInterface.removeConstraint(`${schema}.removido`, 'produto_fk')
    await queryInterface.removeConstraint(`${schema}.comanda`, 'garcom_fk')
  }
};
