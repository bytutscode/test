import sequelize from "../database/sequelizeConfig";
import "../models/Measure";

sequelize.sync()
    .then(() => {
        console.log('Database and tables synchronized!');
    })
    .catch(err => {
        console.error('Unable to create table:', err);
    });