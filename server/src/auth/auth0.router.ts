import express from 'express'
import passport, { authenticate } from 'passport'
import { register } from './auth0.controller'

const router = express.Router()

router.get('/auth0', passport.authenticate('auth0'));

router.get(
  '/auth0/callback',
  passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.post('/register', register)

export default router