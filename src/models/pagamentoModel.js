import { Sequelize } from "sequelize";
import db from "../Banco/db.js";

export default db.define("pagamento", {
    idpagamento: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idcomanda: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    idtppag: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    vlpagamento: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false,
});
