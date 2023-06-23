import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { setupPassportSession } from './utils/passport.service';
import { config } from './config';
import authRouter from './auth/auth0.router';
import mongoose from 'mongoose';


// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const PORT = config.PORT || 5001;
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) and JSON parsing middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter)

// Start the server and set up Passport session
async function startServer() {
  await mongoose.connect(config.mongodb_uri)
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
  setupPassportSession(app);
}

// Call the main function to start the server
startServer().catch((err) => console.error(err));
