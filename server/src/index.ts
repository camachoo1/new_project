import dotenv from 'dotenv';
import cors from 'cors';
import { waitForMongoConnection } from './db';
import { setupPassportSession } from './services/passport.service';

dotenv.config();

const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  await waitForMongoConnection();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  setupPassportSession(app);
}

startServer().catch((err) => console.error(err));
