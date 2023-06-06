import mongoose from 'mongoose';
import { config } from './config';
import { UserModel } from './users/user.model';

// Create a primary connection to MongoDB using the Mongoose library
const primaryConnection: mongoose.Connection =
  mongoose.createConnection(config.mongodb_uri);

// Listen for the 'connected' event and log a message to the console when it occurs
primaryConnection.on('connected', () => {
  console.log(`Connected to MongoDB`);
});

/**
 * Returns a promise that resolves when the primary MongoDB connection is established
 */
export async function waitForMongoConnection() {
  return primaryConnection.asPromise();
}

/**
 * Returns a MongoClient object that can be used to interact with the primary MongoDB database
 */
export async function getMongoClient() {
  // Wait for the primary MongoDB connection to be established before getting the client object
  const connection = await waitForMongoConnection();
  return connection.getClient();
}

export async function createUserCollection() {
  const client = await getMongoClient();
  const db = client.db()

  const collections = await db.listCollections({
    name: 'users'
  }).toArray();

  if (collections.length === 0) { 
    await db.createCollection('users')
    await UserModel.syncIndexes()
  }
  client.close()
}