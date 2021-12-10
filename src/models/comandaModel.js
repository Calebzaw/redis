import { Sequelize } from "sequelize";
import db from "../Banco/db.js";

export default db.define("comanda", {
    idcomanda: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idgarcom: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    dhcomanda: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    desconto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    flcomanda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
},{
    freezeTableName: true,
    timestamps: false,
});
