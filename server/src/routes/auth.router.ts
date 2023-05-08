import express from 'express'
import passport from 'passport'

const authRouter: express.Router = express.Router()

authRouter.get('/auth/auth0/callback', passport.authenticate('auth0', {
  failureRedirect: '/login'
}), (req, res, next) => {
  res.redirect('/')
})