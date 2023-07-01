import cors from 'cors';
import { config } from './config'
import express from 'express';
import mongoose from 'mongoose';
import { UserDocument, UserModel } from './users/user.model';
import { setupPassportSession } from './utils/passport.service';
import passport from 'passport'
import authRouter from './auth/auth0.router'
import cookieParser from 'cookie-parser'
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Initialize the Express application
const PORT = config.PORT;
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) and JSON parsing middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: config.jwt.secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: config.mongodb_uri
    })
  })
)

// Set up Passport session
setupPassportSession(app);

// Passport serialization and deserialization
passport.serializeUser(function (user: Partial<UserDocument>, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Define routes
app.use('/auth', authRouter);

// Start the server
async function startServer() {
  try {
    await mongoose.connect(config.mongodb_uri);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    throw new Error('Failed to connect to MongoDB');
  }
}

// Call the main function to start the server
startServer().catch((err) => {
  console.log('Error starting server:', err);
});

