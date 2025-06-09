import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const CompanyData = db.define('lofts',{
    loftId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId:{
        type: DataTypes.INTEGER,
    },
    name:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    size:{
        type: DataTypes.INTEGER
    },
    guestCountMax:{
        type: DataTypes.INTEGER
    },
    valid:{
        type: DataTypes.BOOLEAN
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