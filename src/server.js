import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import incidentRoutes from './routes/incidentRoutes.js';
import { initializeDatabase } from './database/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize database
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// Routes
app.use('/incidents', incidentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the HumanChain AI Safety Incident Log API',
    endpoints: {
      getAllIncidents: 'GET /incidents',
      createIncident: 'POST /incidents',
      getIncidentById: 'GET /incidents/:id',
      deleteIncidentById: 'DELETE /incidents/:id'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/`);
});

export default app;