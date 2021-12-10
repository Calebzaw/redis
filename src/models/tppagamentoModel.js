import { Sequelize } from "sequelize";
import db from "../Banco/db.js";

export default db.define("tppagamento", {
    idtppag: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    dstppag: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false,
});
