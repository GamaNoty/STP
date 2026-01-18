import { Router, type Request, type Response } from 'express';
import { initDb } from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const db = await initDb();
    const user_ID = (req as any).user.user_ID;
    const subjects = await db.all('SELECT * FROM Subjects WHERE user_ID = ?', [user_ID]);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při načítání předmětů', error });
  }
});



export default router;