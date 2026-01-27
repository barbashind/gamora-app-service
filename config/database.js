import { Sequelize } from "sequelize";

const db = new Sequelize('ufch_db', 'admin', 'PPn98bLcrUw5', {
    host: "10.131.0.9",
    dialect: "mysql",
    port: 5432,
});
 
export default db;
