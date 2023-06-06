import session from 'express-session';
import { getMongoClient } from '../db';
import { MongoClient } from 'mongodb';
import passport from 'passport';
import { config } from '../config';
import express from 'express'
import MongoStore from 'connect-mongo';
import { setupPassport } from './passport';

export function setupPassportSession(app: express.Application) {
  app.use(
    session({
      secret: config.jwt.secretKey,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        clientPromise:
          getMongoClient() as any as Promise<MongoClient>,
        touchAfter: 24 * 60 * 60,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  setupPassport();
}
