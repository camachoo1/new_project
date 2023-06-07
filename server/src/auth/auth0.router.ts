import express from 'express'
import passport, { authenticate } from 'passport'


const router = express.Router()

router.get('/auth0', passport.authenticate('auth0'));

router.get(
  '/auth0/callback',
  passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);



export default router