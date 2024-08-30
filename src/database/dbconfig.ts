import dotenv from 'dotenv';
dotenv.config();
const productionDB = 'postgres://postgres:1234@localhost:5432/shopper_test';
const testDB = 'postgres://postgres:1234@localhost:5432/shopper_test';

let db = productionDB;

if (process.env.NODE_ENV === 'test') {
    db = testDB;
}

export = db;