import { Database as SqliteDatabase } from 'sqlite3';
import { open, Database } from 'sqlite';

export async function initDb(): Promise<Database> {
  const db = await open({
    filename: './database.sqlite',
    driver: SqliteDatabase
  });

  await db.exec('PRAGMA foreign_keys = ON');

  await db.exec(`
    
  `);

  return db;
}