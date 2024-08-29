import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

dotenv.config();

const app = express();

app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});