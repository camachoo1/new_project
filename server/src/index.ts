import dotenv from 'dotenv';
import cors from 'cors';
import { waitForMongoConnection } from './db';
import { setupPassportSession } from './services/passport.service';
import { config } from './config';
const csurf = require('csurf')

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

// Set up CSRF protection middleware with options to configure the cookie:
app.use(
  csurf({
    cookie: {
      // Enable "secure" flag if in production (requires HTTPS):
      secure: config.isProduction,
      // Set "sameSite" to "Lax" if in production:
      sameSite: config.isProduction && 'Lax',
      // Set "httpOnly" flag for added security:
      httpOnly: true
    }
  })
)

// If in production, serve the client build and set a CSRF token cookie for all non-API routes:
if (config.isProduction) {
  const path = require('path')

  // Serve the client's main HTML file as the root route ("/") and set CSRF token cookie:
  app.get('/', (req: any, res: any) => {
    res.cookie('CSRF-TOKEN', req.csrfToken())
    res.sendFile(
      path.resolve(__dirname, '../client', 'build', 'index.html')
    )
  })

  // Serve static files from the client build directory (for CSS/JS/etc.) :
  app.use(express.static(path.resolve('../client/build')))

  // For all other non-API routes, set CSRF token cookie and serve the client's main HTML file:
  app.get(/^(?!\/?api).*/, (req: any, res: any) => {
    res.cookie('CSRF-TOKEN', req.csrfToken())
    res.sendFile(
      path.resolve(__dirname, '../client', 'build', 'index.html')
    )
  })
}


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
