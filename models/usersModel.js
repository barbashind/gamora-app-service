import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const UserData = db.define('users',{
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyId:{
        type: DataTypes.INTEGER
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    main: {
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
 
export default UserData;