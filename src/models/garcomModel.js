import { Sequelize } from "sequelize";
import db from "../Banco/db.js";

export default db.define("garcom", {
    idgarcom: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    nmgarcom: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false,
});
