import MongoStore from 'connect-mongo';
import passport from 'passport';
import {Strategy as Auth0Strategy, Profile } from 'passport-auth0';
import express from 'express';
import session from 'express-session';
import { getMongoClient } from '../src/db';
import { MongoClient } from 'mongodb';
import { UserDocument } from '../src/models/user.model';
import { config } from '../src/config';
const { mongoURI: db } = require('../config/keys');



// Export a function called `setupPassport`
export function setupPassport() {
  // Register a new authentication strategy with Passport.js, identified by the string 'auth0'
  passport.use(
    'auth0',
    new Auth0Strategy(
      // The first parameter is an object that contains configuration options for the Auth0Strategy.
      {
        domain: `config.auth0.domain`, // This is the Auth0 domain.
        clientID: `config.auth0.clientID`, // This is the Auth0 client ID.
        clientSecret: `config.auth0.clientSecret`, // This is the Auth0 client secret.
        callbackURL: `config.auth0.callbackURL`, // This is the callback URL that Auth0 will redirect to after authentication.
      },

      // The second parameter is a callback function that handles the result of the authentication.
      function (
        accessToken,
        refreshToken,
        extraParams,
        profile,
        done
      ) {
        // Look up a user in the database based on their Auth0 user ID (`profile.id`).
        db.User.findOne({ authZeroUserId: String(profile.id) })
          // If the user is found, simply pass the user to the next `then()` block.
          .then((user: UserDocument) =>
            user ? user : createAccountForAuth0(profile)
          )
          // Call the `done()` function to signal the end of the authentication process. Pass in the user object that was found or created.
          .then((user: UserDocument) => done(null, user))
          // In case there was an error while looking up or creating a user, catch it here and pass it to the `done()` function so that Passport.js can handle it appropriately.
          .catch((err: any) => done(err));
      }
    )
  );
}


// This function takes a `Profile` object as input and creates a new user account document for it in the database
export function createAccountForAuth0(
  profile: Profile
): Promise<UserDocument> {
  // Create a new user document object initialized with the properties from the `profile` object
  const newUser: UserDocument = new db.User({
    authZeroUserId: profile.id, // Set the `authZeroUserId` property of the new user document to the `id` property of the `profile` object
    username: profile.displayName, // Set the `username` property of the new user document to the `displayName` property of the `profile` object
    email:
      profile.emails && profile.emails[0] // Check if the `emails` property of the `profile` object is not null or undefined, and if it has an email address at index 0
        ? profile.emails[0].value // If there is an email address at index 0, set the `email` property of the new user document to that email address
        : '', // Otherwise, set the `email` property of the new user document to an empty string
  });

  // Save the new user document to the database using the `.save()` method and return a Promise that resolves with the newly-created user document
  return new db.User(newUser).save();
}


// The function sets up the Passport.js user session by creating a session middleware and configuring it to store user data in MongoDB.
export function setupPassportSession(app: express.Application) {

  // Configuring the session middleware using the 'session' function provided by the 'express-session' package.
  app.use(
    session({
      secret: `config.jwt.secretKey`, // A string used to sign and verify session IDs stored in cookies. This value should be kept secret.
      resave: false, // If true, session data will be saved on every request. Setting this to false optimizes performance.
      saveUninitialized: false, // Saves sessions in the database only if there is data to be saved.
      store: MongoStore.create({ // Specifies that sessions are to be stored in a MongoDB database.
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

