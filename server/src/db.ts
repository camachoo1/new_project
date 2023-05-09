import mongoose from 'mongoose';

// Create a primary connection to MongoDB using the Mongoose library
const primaryConnection: mongoose.Connection =
  mongoose.createConnection(
    'mongodb+srv://admin:gaI6Fzp2KeTzeIo3@music-mern.hn5ufbn.mongodb.net/?retryWrites=true&w=majority'
  );

// Listen for the 'connected' event and log a message to the console when it occurs
primaryConnection.on('connected', () => {
  console.log(`Connected to MongoDB`)
})

/**
 * Returns a promise that resolves when the primary MongoDB connection is established
 */
export async function waitForMongoConnection() {
  return primaryConnection.asPromise()
}

/**
 * Returns a MongoClient object that can be used to interact with the primary MongoDB database
 */
export async function getMongoClient() {
  // Wait for the primary MongoDB connection to be established before getting the client object
  const connection = await waitForMongoConnection();
  return connection.getClient();
}
