import mongoose from 'mongoose';
const {mongoURI: db} = require('./config/keys')

const primaryConnection = mongoose.createConnection(
  db
);

primaryConnection.on('connected', () => {
  console.log(`Connected to MongoDB`)
})

export async function waitForMongoConnection() {
  return primaryConnection.asPromise()
}

export async function getMongoClient() {
  const connection = await waitForMongoConnection();
  return connection.getClient();
}