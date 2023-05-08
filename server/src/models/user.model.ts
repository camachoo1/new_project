import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
  auth0Id: string;
  email: string;
  username: string
}

const UserSchema = new Schema({
  auth0Id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
})

export const User = mongoose.model<UserDocument>('User', UserSchema)