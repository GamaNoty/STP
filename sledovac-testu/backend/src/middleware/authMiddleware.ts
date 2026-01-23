import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { UserPayload } from '../types/index';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Přístup odepřen' });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).json({ message: 'Neplatný token' });
    
    req.user = user as UserPayload;
    next();
  });
};