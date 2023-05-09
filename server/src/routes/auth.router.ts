import express from 'express'
import passport from 'passport'
import { handleLogin } from '../middleware/auth0.middleware'

const authRouter: express.Router = express.Router()

authRouter.get('/auth/auth0/callback', passport.authenticate('auth0', {
  failureRedirect: '/login'
}), (req, res, next) => {
  res.redirect('/')
})

// authRouter.get('/login', handleLogin)

export default authRouter