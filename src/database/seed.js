import { getDb } from './db.js';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Sample incident data
const sampleIncidents = [
  {
    title: 'LLM Generated Misinformation',
    description: 'Language model produced factually incorrect information about medical treatments, potentially endangering users.',
    severity: 'High',
  },
  {
    title: 'Biased Response in HR System',
    description: 'AI-powered HR tool exhibited gender bias in screening job applications for technical roles.',
    severity: 'Medium',
  },
  {
    title: 'Privacy Leak in Voice Assistant',
    description: 'Voice assistant accidentally recorded private conversations and sent them to unintended recipients.',
    severity: 'High',
  }
];

/**
 * Seed the database with sample incidents
 */
async function seedDatabase() {
  try {
    // Create the data directory if it doesn't exist
    await mkdir(`${__dirname}/../../data`, { recursive: true });
    
    const db = await getDb();
    
    // Clear existing records
    await db.run('DELETE FROM incidents');
    
    // Reset the auto-increment
    await db.run('DELETE FROM sqlite_sequence WHERE name="incidents"');
    
    // Insert sample incidents
    const stmt = await db.prepare(
      'INSERT INTO incidents (title, description, severity) VALUES (?, ?, ?)'
    );
    
    for (const incident of sampleIncidents) {
      await stmt.run(incident.title, incident.description, incident.severity);
    }
    
    await stmt.finalize();
    
    console.log('Database seeded successfully with sample incidents');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();