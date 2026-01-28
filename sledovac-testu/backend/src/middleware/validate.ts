import { type Request, type Response, type NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodObject<any, any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Nevalidní data',
          errors: error.issues.map(e => ({ 
            path: e.path.length > 1 ? e.path[1] : e.path[0], 
            message: e.message 
          }))
        });
        return;
      }
      res.status(500).json({ message: 'Interní chyba validace' });
    }
  };