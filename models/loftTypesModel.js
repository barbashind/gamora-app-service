import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const LoftTypes = db.define('loft_types',{
    code:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    text:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});
 
export default LoftTypes;