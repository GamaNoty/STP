import { Router, type Request, type Response } from 'express';
import { initDb } from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';

const router = Router();

const TestSchema = z.object({
  body: z.object({
    subject_ID: z.number().int().positive("ID předmětu musí být číslo"),
    group_ID: z.number().int().positive().nullable(),
    name: z.string().min(3, "Název testu je příliš krátký"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Datum musí být ve formátu RRRR-MM-DD")
  })
});

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const db = await initDb();
    const user_ID = req.user?.user_ID;
    const tests = await db.all('SELECT * FROM Tests WHERE user_ID = ?', [user_ID]);
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při načítání testů', error });
  }
});

router.post('/', authenticateToken, validate(TestSchema), async (req: Request, res: Response) => {
  const { subject_ID, group_ID, name, date } = req.body;
  const user_ID = req.user?.user_ID;

  try {
    const db = await initDb();
    const result = await db.run(
      'INSERT INTO Tests (subject_ID, group_ID, user_ID, name, date) VALUES (?, ?, ?, ?, ?)',
      [subject_ID, group_ID || null, user_ID, name, date]
    );
    res.status(201).json({ test_ID: result.lastID, name, date });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při vytváření testu', error });
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_ID = req.user?.user_ID;

  try {
    const db = await initDb();
    const result = await db.run(
      'DELETE FROM Tests WHERE test_ID = ? AND user_ID = ?',
      [id, user_ID]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Test nenalezen' });
    }
    res.json({ message: 'Test smazán' });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při mazání testu', error });
  }
});

export default router;