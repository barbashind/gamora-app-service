import { Sequelize } from "sequelize";

const db = new Sequelize('gamora_db', 'gamora', 'Swede9Careers|Hooker', {
    host: "78.107.239.94",
    dialect: "mysql",
    port: 3306,
});
 
export default db;
