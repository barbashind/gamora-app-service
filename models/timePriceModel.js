import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const TimePrice = db.define('loft_timeprice',{
    timepriceId :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    loftId:{
        type: DataTypes.INTEGER
    },
    weekDay:{
        type: DataTypes.STRING
    },
    timeStart:{
        type: DataTypes.STRING
    },
    timeEnd:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },
},{
    freezeTableName: true
});
 
export default TimePrice;