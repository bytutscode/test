import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import path from 'path';


dotenv.config();

dotenv.config();

const app = express();
app.use(express.json( {limit: '10mb'} ));
app.use(express.static(path.join(__dirname, 'temp_uploads')));

app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
});