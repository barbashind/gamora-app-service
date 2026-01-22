import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const ConnectionMonth = db.define('connections_month',{
    connectionMonthId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pointId:{
        type: DataTypes.INTEGER,
    },
    time:{
        type: DataTypes.INTEGER,
    },
    losses:{
        type: DataTypes.INTEGER,
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }

},{
    freezeTableName: true
});
 
export default ConnectionMonth;