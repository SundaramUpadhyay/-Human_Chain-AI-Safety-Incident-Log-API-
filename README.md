# HumanChain AI Safety Incident Log API

A RESTful API service for logging and managing hypothetical AI safety incidents, designed for HumanChain's mission in AI safety.

## Tech Stack

- **Language/Framework**: JavaScript (Node.js) with Express
- **Database**: SQLite
- **Validation**: express-validator
- **Logging**: morgan

## Features

- Complete RESTful API with endpoints for creating, reading, and deleting incidents
- Data persistence with SQLite
- Input validation
- Error handling
- Sample data seeding

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository or extract the zip file:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd humanchain-ai-safety-api
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables (optional):
   ```
   cp .env.example .env
   ```
   
   You can adjust the PORT in the .env file if needed.

### Database Setup

The application uses SQLite, which doesn't require a separate server installation. The database file will be created automatically when you first run the application in the `data` directory.

To pre-populate the database with sample incidents:

```
npm run seed
```

This will create the database schema and add 3 sample incidents.

### Running the Application

Start the development server:

```
npm run dev
```

The API will be available at `http://localhost:3000`.

For production:

```
npm start
```

## API Documentation

### Endpoints

#### 1. GET /incidents

Retrieves all incidents from the database.

**Example Request:**
```
curl -X GET http://localhost:3000/incidents
```

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "LLM Generated Misinformation",
    "description": "Language model produced factually incorrect information about medical treatments, potentially endangering users.",
    "severity": "High",
    "reported_at": "2023-06-15T14:30:45.000Z"
  },
  {
    "id": 2,
    "title": "Biased Response in HR System",
    "description": "AI-powered HR tool exhibited gender bias in screening job applications for technical roles.",
    "severity": "Medium",
    "reported_at": "2023-06-16T09:15:30.000Z"
  }
]
```

#### 2. POST /incidents

Creates a new incident.

**Example Request:**
```
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Unauthorized Data Access",
    "description": "AI system accessed restricted datasets without proper authorization during training.",
    "severity": "High"
  }'
```

**Example Response:**
```json
{
  "id": 4,
  "title": "Unauthorized Data Access",
  "description": "AI system accessed restricted datasets without proper authorization during training.",
  "severity": "High",
  "reported_at": "2023-06-17T11:22:33.000Z"
}
```

#### 3. GET /incidents/{id}

Retrieves a specific incident by ID.

**Example Request:**
```
curl -X GET http://localhost:3000/incidents/1
```

**Example Response:**
```json
{
  "id": 1,
  "title": "LLM Generated Misinformation",
  "description": "Language model produced factually incorrect information about medical treatments, potentially endangering users.",
  "severity": "High",
  "reported_at": "2023-06-15T14:30:45.000Z"
}
```

#### 4. DELETE /incidents/{id}

Deletes an incident by ID.

**Example Request:**
```
curl -X DELETE http://localhost:3000/incidents/1
```

**Example Response:**
Status 204 No Content (empty response body)

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400 Bad Request: Invalid input data
- 404 Not Found: Requested resource not found
- 500 Internal Server Error: Server-side issues

## Design Decisions

- **SQLite**: Chosen for simplicity in setup and portability, making it easy for evaluators to run the application without complex database setup.
- **Express.js**: A lightweight and flexible Node.js framework that provides a robust set of features for web applications.
- **Modular Architecture**: The codebase is organized with separate files for routes, controllers, database access, and middleware for better maintainability.
- **Input Validation**: Using express-validator to ensure data integrity and security.
- **Error Handling Middleware**: Centralized error handling for consistent error responses across the API.

## Future Improvements

- Add authentication and authorization
- Implement incident updates (PUT/PATCH endpoint)
- Add filtering and pagination for the GET /incidents endpoint
- Implement more advanced validation and sanitization
- Add comprehensive test suite