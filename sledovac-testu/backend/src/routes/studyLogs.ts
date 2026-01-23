import { Router, type Request, type Response } from 'express';
import { initDb } from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const db = await initDb();
    const user_ID = req.user?.user_ID;
    const logs = await db.all('SELECT * FROM LearningRecords WHERE user_ID = ?', [user_ID]);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při načítání záznamů o učení', error });
  }
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const { test_ID, subject_ID, minutes } = req.body;
  const user_ID = req.user?.user_ID;

  try {
    const db = await initDb();
    const result = await db.run(
      'INSERT INTO LearningRecords (user_ID, test_ID, subject_ID, minutes) VALUES (?, ?, ?, ?)',
      [user_ID, test_ID || null, subject_ID, minutes]
    );
    res.status(201).json({ record_ID: result.lastID, minutes, user_ID });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při vytváření záznamu', error });
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_ID = req.user?.user_ID;

  try {
    const db = await initDb();
    const result = await db.run(
      'DELETE FROM LearningRecords WHERE record_ID = ? AND user_ID = ?',
      [id, user_ID]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Záznam nenalezen' });
    }
    res.json({ message: 'Záznam smazán' });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při mazání záznamu', error });
  }
});

export default router;