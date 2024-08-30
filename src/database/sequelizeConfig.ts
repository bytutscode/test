import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import db from './dbconfig';
dotenv.config()

const sequelize = new Sequelize(db,
    { dialectModule: require('pg'), dialect: 'postgres', logging: false }
)

export default sequelize;