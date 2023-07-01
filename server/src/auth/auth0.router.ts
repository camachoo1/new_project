import express from 'express'
import passport, { authenticate } from 'passport'
import {expressjwt, Request as JWTRequest} from 'express-jwt'
import { config } from '../config'

const router = express.Router()

router.get('/auth', passport.authenticate('auth0', {scope: 'openid email profile'}));

router.get(
  '/auth0/callback',
  passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/protected',expressjwt({secret: config.jwt.secretKey, algorithms: ['RS256'], audience: config.auth0.audience}), (req: JWTRequest, res: express.Response) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated())
    res.send('You have access to the protected route')
  } else {
    res.send('You are not authenticated')
  }
})



export default router