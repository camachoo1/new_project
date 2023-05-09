import dotenv from 'dotenv';
import cors from 'cors';
import { waitForMongoConnection } from './db';
import { setupPassportSession } from './services/passport.service';

// Import authentication router
const authRouter = require('./routes/auth.router')

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Mount the authentication router on a specific path
// app.use('/', authRouter)

// Start the server and set up Passport session
async function startServer() {
  await waitForMongoConnection();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
  setupPassportSession(app);
}

// Call the main function to start the server
startServer().catch((err) => console.error(err));
