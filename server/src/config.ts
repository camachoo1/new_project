// Define the required options for connecting to Auth0
interface Auth0Options {
  domain: string | undefined; // The domain of your Auth0 account
  clientId: string | undefined; // Your Auth0 client ID
  clientSecret: string | undefined; // Your Auth0 client secret
  callbackURL: string | undefined; // The URI that Auth0 should redirect to after authentication
}

// Define the options for JWT tokens
interface JwtOptions {
  secretKey: string | undefined; // The shared secret key used to sign JWT tokens
  expiresIn: string; // The amount of time for which a JWT token is valid
}

// Define the overall configuration options for the app
interface ConfigOptions {
  mongodb_uri: string | undefined; // The URI for your MongoDB database
  auth0: Auth0Options; // An object containing the required Auth0 options
  jwt: JwtOptions; // An object containing the required JWT options
}

// Export the complete configuration object
export const config: ConfigOptions = {
  // Get the MongoDB URI from environment variables
  mongodb_uri: process.env.MONGODB_URI,
  // Get the Auth0 domain, client ID, client secret, and callback URL from environment variables
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  // Get the JWT secret key and expiration time from environment variables
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresIn: '1h'
  }
}
