import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { initDb } from './db.js';

config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

initDb().then(() => {
  console.log('Database initialized');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database', err);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Sledovač testů a učení API running');
});