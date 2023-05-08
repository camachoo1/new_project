import mongoose from 'mongoose';

const primaryConnection = mongoose.createConnection(
  'mongodb+srv://admin:gaI6Fzp2KeTzeIo3@music-mern.hn5ufbn.mongodb.net/?retryWrites=true&w=majority'
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