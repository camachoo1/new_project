import mongoose, { Schema, Document } from 'mongoose';

// Define the properties that can be used to create or update a User document
export interface UserDocument extends Document {
  auth0Id: string;
  email: string;
  username: string
}

// Define the structure of a User document and its validation constraints
const UserSchema = new Schema({
  // An auth0 ID is required to uniquely identify a user
  auth0Id: {
    type: String,
    required: true
  },
  // An email address is required and must be unique
  email: {
    type: String,
    required: true,
    unique: true
  },
  // A username is required and must be unique
  username: {
    type: String,
    required: true,
    unique: true
  }
})

// Creates a User model using the defined schema and exports it for use in other parts of the application
export const User = mongoose.model<UserDocument>('User', UserSchema)
