import dotenv from 'dotenv';
dotenv.config();
const productionDB = 'postgres://user:password@host:port/dbname';
const testDB = 'postgres://user:password@host:port/dbname';

let db = productionDB;

if (process.env.NODE_ENV === 'test') {
    db = testDB;
}

export = db;