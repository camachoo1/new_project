import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { getMongoClient } from '../db';
import { MongoClient } from 'mongodb';
import passport from 'passport';
import { setupPassport } from './passport';
import { config } from '../config';

// The function sets up the Passport.js user session by creating a session middleware and configuring it to store user data in MongoDB.
export function setupPassportSession(app: express.Application) {
  // Configuring the session middleware using the 'session' function provided by the 'express-session' package.
  app.use(
    session({
      secret: config.jwt.secretKey, // A string used to sign and verify session IDs stored in cookies. This value should be kept secret.
      resave: false, // If true, session data will be saved on every request. Setting this to false optimizes performance.
      saveUninitialized: false, // Saves sessions in the database only if there is data to be saved.
      store: MongoStore.create({
        // Specifies that sessions are to be stored in a MongoDB database.
        clientPromise:
          getMongoClient() as any as Promise<MongoClient>, // This property specifies the connection used to interact with the database.
        collectionName: 'userSessions', // The name of the collection where the session data will be stored.
        touchAfter: 24 * 60 * 60, // Update the session's timestamp after this number of seconds (86400 seconds = 1 day).
      }),
    })
  );

  // Initializing Passport.js and setting up sessions for persistent login.
  app.use(passport.initialize());
  app.use(passport.session());

  // Calling a function that configures Passport.js strategies for authenticating users.
  setupPassport();
}
