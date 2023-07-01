import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the properties that can be used to create or update a User document
export interface UserDocument extends Document {
  auth0Id: string;
  email: string;
  name: string;
  picture: string;
  _id: Types.ObjectId
}

// Define the structure of a User document and its validation constraints
const UserSchema = new Schema({
  // An auth0 ID is required to uniquely identify a user
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  // An email address is required and must be unique
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  }
})

// Creates a User model using the defined schema and exports it for use in other parts of the application
export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
