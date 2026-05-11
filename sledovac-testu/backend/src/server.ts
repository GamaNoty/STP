import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import subjectsRoutes from './routes/subjects.js';
import testsRoutes from './routes/tests.js';
import studyLogsRoutes from './routes/studyLogs.js';

config();

if (!process.env.JWT_SECRET) {
  console.error('\n======================================================');
  console.error('FATAL ERROR: Chybi JWT_SECRET v prostredi!');
  console.error('======================================================');
  console.error('Aplikace nemuze startovat, protoze chybi tajny klic pro tokeny.');
  
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://studentsproject.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

initDb().then(() => {
  console.log('Database initialized');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database', err);
  process.exit(1);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Sledovac testu a uceni API running');
});

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/tests', testsRoutes);
app.use('/api/studyLogs', studyLogsRoutes);
