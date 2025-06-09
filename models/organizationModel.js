import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const CompanyData = db.define('organizations',{
    companyId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyName:{
        type: DataTypes.STRING
    },
    shortName:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    inn:{
        type: DataTypes.STRING
    },
    contact:{
        type: DataTypes.STRING
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
 
export default CompanyData;