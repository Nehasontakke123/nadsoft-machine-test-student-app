// index.js

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import required packages
import express from 'express';
import cors from 'cors';

// Import student route module
import studentRoutes from './routes/studentRoutes.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount student routes at /students endpoint
app.use('/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
