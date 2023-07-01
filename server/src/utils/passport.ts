import { Strategy as Auth0Strategy, Profile } from 'passport-auth0';
import passport from 'passport';
import { UserDocument, UserModel } from '../users/user.model';
import { createAccountForAuth0 } from '../auth/auth0.utils';
import { config } from '../config';



export function setupPassport() {
  passport.use(
    'auth0',
    new Auth0Strategy(
      {
        domain: config.auth0.domain,
        clientID: config.auth0.clientId,
        clientSecret: config.auth0.clientSecret,
        callbackURL: config.auth0.callbackURL,
      },
      async function (
        accessToken,
        refreshToken,
        extraParams,
        profile,
        done
      ) {
        // Look up a user in the database based on their Auth0 user ID (`profile.id`).
        try {
          const user = await createAccountForAuth0(profile)
          done(null, user)
        } catch (err) {
          done(err)
        }
      }
    )
  );
}
