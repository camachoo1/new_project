import { waitForMongoConnection } from './DB';
import { setupPassportSession } from './auth';

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

async function startServer() {
  await waitForMongoConnection()
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  setupPassportSession(app)
}

startServer().catch((err) => console.error(err));