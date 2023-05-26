import express from 'express'
import passport from 'passport'
import { handleLogin } from './auth0.middleware'
import { register } from './auth0.controller'

const router = express.Router()

router.get('/auth/auth0/callback', passport.authenticate('auth0', {
  failureRedirect: '/login'
}), (req, res, next) => {
  res.redirect('/')
})

router.post('/register', register)

export default router