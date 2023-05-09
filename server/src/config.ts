interface Auth0Options {
  domain: string | undefined;
  clientId: string | undefined;
  clientSecret: string | undefined;
  callbackURL: string | undefined;
}

interface JwtOptions {
  secretKey: string | undefined;
  expiresIn: string;
}

interface ConfigOptions {
  mongodb_uri: string | undefined;
  auth0: Auth0Options;
  jwt: JwtOptions;
  isProduction: boolean;
}

export const config: ConfigOptions = {
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
  },
  isProduction: process.env.NODE_ENV === 'production'
}