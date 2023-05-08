import { waitForMongoConnection } from './db';
import { setupPassportSession } from '../auth';
import dotenv from 'dotenv';
import cors from 'cors';

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
