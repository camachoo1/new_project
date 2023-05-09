import { Strategy as Auth0Strategy, Profile } from 'passport-auth0';
import passport from 'passport';
import { UserDocument } from '../models/user.model';
import { createAccountForAuth0 } from '../utils/auth0.utils';

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
