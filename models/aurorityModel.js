import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Autority = db.define('users',{
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING
    },
    companyId:{
        type: DataTypes.INTEGER
    },

},{
    freezeTableName: true
});
 
export default Autority;