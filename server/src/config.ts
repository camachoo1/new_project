import dotenv from 'dotenv'
dotenv.config()

export const config = {
  mongodb_uri: String(process.env.MONGODB_URI),
  auth0: {
    domain: String(process.env.AUTH0_DOMAIN),
    clientId: String(process.env.AUTH0_CLIENT_ID),
    clientSecret: String(process.env.AUTH0_CLIENT_SECRET),
    callbackURL: String(process.env.AUTH0_CALLBACK_URL)
  },
  jwt: {
    secretKey: String(process.env.JWT_SECRET),
    expiresIn: '1h'
  },
  isProduction: process.env.NODE_ENV === 'production'
}