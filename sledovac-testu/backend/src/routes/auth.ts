import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { initDb } from '../db.js';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {

});

router.post('/login', async (req: Request, res: Response) => {
});

export default router;