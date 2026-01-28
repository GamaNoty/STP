declare namespace Express {
    export interface Request {
      user?: {
        user_ID: number;
        Role_ID: number;
      };
    }
  }