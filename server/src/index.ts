import dotenv from 'dotenv';
import cors from 'cors';
import { waitForMongoConnection } from './db';
import { setupPassportSession } from './services/passport.service';
// import authRouter from './routes/auth.router';
const authRouter = require('./routes/auth.router')

dotenv.config();

const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/', authRouter)

async function startServer() {
  await waitForMongoConnection();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  setupPassportSession(app);
}

startServer().catch((err) => console.error(err));
