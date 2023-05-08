import MongoStore from 'connect-mongo';
import passport from 'passport';
import Auth0Strategy, { Profile } from 'passport-auth0';
import express from 'express';
import session from 'express-session';
import { getMongoClient } from '../DB';
import { MongoClient } from "mongodb";
const { mongoURI: db } = require('../config/keys');
// import { mongoURI as db } from '../config/keys';


interface User {
  authZeroUserId: string;
  name: string;
  email: string;
}


export function setupPassport() {
  passport.use(
    'auth0',
    new Auth0Strategy(
      {
        domain: `process.env.DOMAIN`,
        clientID: `process.env.CLIENT_ID`,
        clientSecret: `process.env.CLIENT_SECRET`,
        callbackURL: 'http://localhost:3001',
      },
      function (
        accessToken,
        refreshToken,
        extraParams,
        profile,
        done
      ) {
        db.User.findOne({ authZeroUserId: String(profile.id) })
            .then((user: User) => (user ? user : createAccountForAuth0(profile)))
            .then((user: User) => done(null, user))
            .catch((err: any) => done(err));
      }
    )
  );
}

export function createAccountForAuth0(profile: Profile): Promise<User> {
  const newUser: User = new db.User({
    authZeroUserId: profile.id,
    name: profile.displayName,
    email: (profile.emails && profile.emails[0]) ? profile.emails[0].value : '',
  })

  return new db.User(newUser).save()
}


export function setupPassportSession(app: express.Application) {
  app.use(
    session({
      secret: '',
      name: '',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        clientPromise: getMongoClient() as any as Promise<MongoClient>,
        collectionName: 'userSessions',
        touchAfter: 24 * 60 * 60,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  setupPassport();
}
