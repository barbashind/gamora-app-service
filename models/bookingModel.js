import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;

const Booking = db.define('bookings',{
    bookingId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    companyId:{
        type: DataTypes.INTEGER
    },
    loftId:{
        type: DataTypes.INTEGER
    },
    loftName:{
        type: DataTypes.STRING
    },
    client:{
        type: DataTypes.STRING
    },
    startDate:{
        type: DataTypes.DATE
    },
    endDate:{
        type: DataTypes.DATE
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
 
export default Booking;