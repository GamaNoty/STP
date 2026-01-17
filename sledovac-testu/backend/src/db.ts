import { Database as SqliteDatabase } from 'sqlite3';
import { open, Database } from 'sqlite';

export async function initDb(): Promise<Database> {
  const db = await open({
    filename: './database.sqlite',
    driver: SqliteDatabase
  });

  await db.exec('PRAGMA foreign_keys = ON');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Roles (
      role_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Users (
      user_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      Role_ID INTEGER,
      FOREIGN KEY (Role_ID) REFERENCES Roles(role_ID)
    );

    CREATE TABLE IF NOT EXISTS Groups (
      group_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_by INTEGER,
      user_ID INTEGER,
      FOREIGN KEY (created_by) REFERENCES Users(user_ID),
      FOREIGN KEY (user_ID) REFERENCES Users(user_ID)
    );

    CREATE TABLE IF NOT EXISTS GroupMembership (
      membership_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      group_ID INTEGER,
      user_ID INTEGER,
      FOREIGN KEY (group_ID) REFERENCES Groups(group_ID),
      FOREIGN KEY (user_ID) REFERENCES Users(user_ID)
    );

    CREATE TABLE IF NOT EXISTS Subjects (
      subject_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      user_ID INTEGER,
      name TEXT NOT NULL,
      FOREIGN KEY (user_ID) REFERENCES Users(user_ID)
    );

    CREATE TABLE IF NOT EXISTS Tests (
      test_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_ID INTEGER,
      group_ID INTEGER,
      user_ID INTEGER,
      name TEXT NOT NULL,
      date DATE NOT NULL,
      FOREIGN KEY (subject_ID) REFERENCES Subjects(subject_ID),
      FOREIGN KEY (group_ID) REFERENCES Groups(group_ID),
      FOREIGN KEY (user_ID) REFERENCES Users(user_ID)
    );

    CREATE TABLE IF NOT EXISTS LearningRecords (
      record_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      user_ID INTEGER,
      test_ID INTEGER,
      subject_ID INTEGER,
      minutes INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_ID) REFERENCES Users(user_ID),
      FOREIGN KEY (test_ID) REFERENCES Tests(test_ID),
      FOREIGN KEY (subject_ID) REFERENCES Subjects(subject_ID)
    );
  `);

  return db;
}