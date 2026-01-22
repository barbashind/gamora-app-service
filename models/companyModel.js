import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const CompanyData = db.define('organizations',{
    companyId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mstroyCompanyId:{
        type: DataTypes.INTEGER,
    },
    name:{
        type: DataTypes.STRING
    },
    mainCompanyID:{
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
 
export default CompanyData;