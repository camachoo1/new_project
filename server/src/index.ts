import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { setupPassportSession } from './utils/passport.service';
import { config } from './config';
import authRouter from './auth/auth0.router';
import mongoose from 'mongoose';
import debug from 'debug'
import winston from 'winston'


// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const PORT = config.PORT || 5001;
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) and JSON parsing middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  logger.info('Middleware logger test'); // Add this line
  next();
});

app.use('/auth', authRouter)

const debugLogger = debug('app:debug')
debugLogger.enabled = process.env.DEBUG === 'true'

export const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console()
  ]
})

logger.debug('Debug Message')
logger.info('Info Message')
logger.warn('Warn Message')
logger.error('Error Message')

// Start the server and set up Passport session
async function startServer() {
  await mongoose.connect(config.mongodb_uri)
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    debugLogger(`Server listening on ${PORT}`);
  });
  setupPassportSession(app);
}

// Call the main function to start the server
startServer().catch((err) => {
  debugLogger('Error starting server:', err)
  logger.error('Error starting server:', err)
});
