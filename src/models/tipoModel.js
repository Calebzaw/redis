import { Sequelize } from "sequelize";
import db from "../Banco/db.js";

export default db.define("tipo", {
    idtipo: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    nmtipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    flsituacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
        },
},{
    freezeTableName: true,
    timestamps: false,
});
