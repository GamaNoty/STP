import bcrypt from 'bcrypt';
import { Router, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { initDb } from '../db.js';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {

    const { name, email, password, Role_ID } = req.body;

    try {
      const db = await initDb();
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await db.run(
        'INSERT INTO Users (name, email, password_hash, Role_ID) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, Role_ID || 1]
      );
  
      res.status(201).json({ message: 'Uživatel byl úspěšně zaregistrován' });
    } catch (error: any) {
      if (error.errno === 19) {
        return res.status(400).json({ message: 'Tento e-mail se již používá' });
      }
      res.status(500).json({ message: 'Chyba při registraci', error });
    }
});

router.post('/login', async (req: Request, res: Response) => {
});

export default router;