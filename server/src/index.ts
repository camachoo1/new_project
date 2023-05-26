import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { waitForMongoConnection } from './db';
import { setupPassportSession } from './utils/passport.service';
import { config } from './config';
import authRouter from './auth/auth0.router';


// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const PORT = process.env.PORT || 3001;
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) and JSON parsing middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter)

// // If in production, serve the client build and set a CSRF token cookie for all non-API routes:
// if (config.isProduction) {
//   const path = require('path');

//   // Serve the client's main HTML file as the root route ("/") and set CSRF token cookie:
//   app.get('/', (req: any, res: any) => {
//     res.cookie('CSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../client', 'build', 'index.html')
//     );
//   });

//   // Serve static files from the client build directory (for CSS/JS/etc.) :
//   app.use(express.static(path.resolve('../client/build')));

//   // For all other non-API routes, set CSRF token cookie and serve the client's main HTML file:
//   app.get(/^(?!\/?api).*/, (req: any, res: any) => {
//     res.cookie('CSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../client', 'build', 'index.html')
//     );
//   });
// }


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
