import { Sequelize } from "sequelize";
import db from "../Banco/db.js";

export default db.define("removido", {
    idremovido: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idcomanda: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    idproduto: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false,
});
