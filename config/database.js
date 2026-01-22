import { Sequelize } from "sequelize";

const db = new Sequelize('ufch_db', 'ufch', 'Swede9Careers|Hooker', {
    host: "10.100.60.90",
    dialect: "mysql",
    port: 3306,
});
 
export default db;
