import { Router, type Request, type Response } from 'express';
import { initDb } from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const db = await initDb();
    const user_ID = req.user?.user_ID;
    const subjects = await db.all('SELECT * FROM Subjects WHERE user_ID = ?', [user_ID]);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při načítání předmětů', error });
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
    const { name } = req.body;
    const user_ID = req.user?.user_ID;
  
    try {
      const db = await initDb();
      const result = await db.run(
        'INSERT INTO Subjects (name, user_ID) VALUES (?, ?)',
        [name, user_ID]
      );
      res.status(201).json({ subject_ID: result.lastID, name, user_ID });
    } catch (error) {
      res.status(500).json({ message: 'Chyba při vytváření předmětu', error });
    }
  });
  
  router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;
    const user_ID = (req as any).user.user_ID;
  
    try {
      const db = await initDb();
      const result = await db.run(
        'UPDATE Subjects SET name = ? WHERE subject_ID = ? AND user_ID = ?',
        [name, id, user_ID]
      );
  
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Předmět nenalezen nebo nemáte oprávnění' });
      }
      res.json({ message: 'Předmět upraven' });
    } catch (error) {
      res.status(500).json({ message: 'Chyba při úpravě předmětu', error });
    }
  });
  
  router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const user_ID = req.user?.user_ID;
  
    try {
      const db = await initDb();
      const result = await db.run(
        'DELETE FROM Subjects WHERE subject_ID = ? AND user_ID = ?',
        [id, user_ID]
      );
  
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Předmět nenalezen nebo nemáte oprávnění' });
      }
      res.json({ message: 'Předmět smazán' });
    } catch (error) {
      res.status(500).json({ message: 'Chyba při mazání předmětu', error });
    }
  });

export default router;