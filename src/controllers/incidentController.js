import { body, validationResult } from 'express-validator';
import { getDb } from '../database/db.js';

/**
 * Validation rules for creating an incident
 */
export const createIncidentValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('severity')
    .notEmpty().withMessage('Severity is required')
    .isIn(['Low', 'Medium', 'High']).withMessage('Severity must be Low, Medium, or High')
];

/**
 * Get all incidents
 */
export async function getAllIncidents(req, res, next) {
  try {
    const db = await getDb();
    const incidents = await db.all('SELECT * FROM incidents ORDER BY reported_at DESC');
    
    res.status(200).json(incidents);
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new incident
 */
export async function createIncident(req, res, next) {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { title, description, severity } = req.body;
    
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO incidents (title, description, severity) VALUES (?, ?, ?)',
      [title, description, severity]
    );
    
    // Get the created incident
    const incident = await db.get('SELECT * FROM incidents WHERE id = ?', result.lastID);
    
    res.status(201).json(incident);
  } catch (error) {
    next(error);
  }
}

/**
 * Get incident by ID
 */
export async function getIncidentById(req, res, next) {
  try {
    const { id } = req.params;
    
    const db = await getDb();
    const incident = await db.get('SELECT * FROM incidents WHERE id = ?', id);
    
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    res.status(200).json(incident);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete incident by ID
 */
export async function deleteIncident(req, res, next) {
  try {
    const { id } = req.params;
    
    const db = await getDb();
    
    // Check if incident exists
    const incident = await db.get('SELECT id FROM incidents WHERE id = ?', id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    
    // Delete the incident
    await db.run('DELETE FROM incidents WHERE id = ?', id);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}