import session from 'express-session';
import { MongoClient } from 'mongodb';
import passport from 'passport';
import { config } from '../config';
import express from 'express'
import MongoStore from 'connect-mongo';
import { setupPassport } from './passport';
import { UserDocument, UserModel } from '../users/user.model';
import mongoose from 'mongoose';

export function setupPassportSession(app: express.Application) {
  app.use(
    session({
      secret: config.jwt.secretKey,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: config.mongodb_uri,
        touchAfter: 24 * 60 * 60,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  setupPassport();
}

passport.serializeUser(function (user: Partial<UserDocument>, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err: any, user: UserDocument) {
    done(err, user)
  })
})