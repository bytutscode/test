import dotenv from 'dotenv';
dotenv.config();
const productionDB = process.env.DATABASE_URL as string;
const testDB = process.env.DATABASE_TEST_URL as string;

let db = productionDB;

if (process.env.NODE_ENV === 'test') {
    db = testDB;
}

export = db;