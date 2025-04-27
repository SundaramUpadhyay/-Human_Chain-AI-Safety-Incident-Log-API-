import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Database connection instance
let db;

/**
 * Initialize the database connection and create tables if they don't exist
 */
export async function initializeDatabase() {
  if (!db) {
    db = await open({
      filename: './data/incidents.db',
      driver: sqlite3.Database
    });

    // Create incidents table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        severity TEXT NOT NULL CHECK(severity IN ('Low', 'Medium', 'High')),
        reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
  }
  
  return db;
}

/**
 * Get the database instance
 */
export async function getDb() {
  if (!db) {
    await initializeDatabase();
  }
  return db;
}