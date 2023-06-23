import dotenv from 'dotenv'
dotenv.config()

export const config = {
  PORT: process.env.PORT as string,
  mongodb_uri: process.env.MONGODB_URI as string,
  auth0: {
    domain: process.env.AUTH0_DOMAIN as string,
    clientId: process.env.AUTH0_CLIENT_ID as string,
    clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
    callbackURL: process.env.AUTH0_CALLBACK_URL as string,
    audience: process.env.AUTH0_AUDIENCE as string,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET as string,
    expiresIn: '1h'
  },
  isProduction: process.env.NODE_ENV === 'production'
}