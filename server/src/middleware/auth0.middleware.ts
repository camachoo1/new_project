import passport from 'passport'
import express from 'express'
import { UserDocument } from '../models/user.model';

// Define a login route handler function that authenticates the user using the Auth0 strategy
export function handleLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
  passport.authenticate('auth0', function(err: any, user: UserDocument, info: any) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/protected'); // redirect to a protected route
    });
  })(req, res, next);
}
