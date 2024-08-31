import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import path from 'path';
import './scripts/syncDatabase'; 


dotenv.config();

dotenv.config();

const app = express();
app.use(express.json( {limit: '10mb'} ));
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

const port = process.env.PORT || 80;
const server = app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
  
export { server, app }; 