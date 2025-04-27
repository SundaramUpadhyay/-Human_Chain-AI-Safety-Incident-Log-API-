import express from 'express';
import {
  getAllIncidents,
  createIncident,
  getIncidentById,
  deleteIncident,
  createIncidentValidation
} from '../controllers/incidentController.js';

const router = express.Router();

/**
 * @route GET /incidents
 * @desc Get all incidents
 */
router.get('/', getAllIncidents);

/**
 * @route POST /incidents
 * @desc Create a new incident
 */
router.post('/', createIncidentValidation, createIncident);

/**
 * @route GET /incidents/:id
 * @desc Get incident by ID
 */
router.get('/:id', getIncidentById);

/**
 * @route DELETE /incidents/:id
 * @desc Delete incident by ID
 */
router.delete('/:id', deleteIncident);

export default router;