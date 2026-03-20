import express from 'express';
import cors from 'cors';
import playersRouter from './routes.js';

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/players', playersRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});