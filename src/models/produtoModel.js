import { Sequelize } from "sequelize";
import db from "../Banco/db.js";

export default db.define("produto", {
    idproduto: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idtipo: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    vlproduto: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    dsproduto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    flsituacao: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false,
});
