export const config = {
  mongodb_uri: process.env.MONGO_URI,
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresIn: '1h'
  }
}