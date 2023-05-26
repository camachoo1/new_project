import { pre, prop, getModelForClass } from '@typegoose/typegoose';
import bcrypt from 'bcrypt'
// This is a Mongoose "pre" middleware function that hashes the user's password before saving it to the database.
// It is triggered by the "save" event and passes control to the next middleware in the stack by calling the "next" function.
@pre<User>('save', async function (next) {
  if (this.isModified('password')) { // Check if the password has been modified. We only hash the password if it has been changed.
    try {
      const hash = await bcrypt.hash(this.password, 12) // Hash the password using the bcrypt library with a salt of 12 rounds.
      this.password = hash // Store the hashed password in the "password" field of the User object.
      return next() // Call the next middleware function in the stack to continue with the save operation.
    } catch (err: any) {
      return next(err) // If an error occurs during hashing, call the next middleware function with the error.
    }
  }
})

// This is a User class that defines the shape of a User object in our database.
// The prop decorator is used to define properties on the User object, along with validation constraints.
export class User {
  @prop({ required: true }) // Use the "prop" decorator to define a required property on the User object.
  authZeroUserId!: string;

  @prop({ required: true, unique: true }) // Use the "prop" decorator to define a required and unique property on the User object.
  email!: string;

  @prop({ required: true, unique: true }) // Use the "prop" decorator to define a required and unique property on the User object.
  username!: string;

  @prop({ required: true }) // Use the "prop" decorator to define a required property on the User object.
  password!: string
}

// This is the MongoDB "User" model that will be used to perform CRUD operations on the database.
// The getModelForClass function takes the "User" class as input and returns the corresponding model.
export const UserDocument = getModelForClass(User);







// import mongoose, { Schema, Document } from 'mongoose';

// // Define the properties that can be used to create or update a User document
// export interface UserDocument extends Document {
//   auth0Id: string;
//   email: string;
//   username: string
// }

// // Define the structure of a User document and its validation constraints
// const UserSchema = new Schema({
//   // An auth0 ID is required to uniquely identify a user
//   authZeroId: {
//     type: String,
//     required: true
//   },
//   // An email address is required and must be unique
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   // A username is required and must be unique
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   }
// })

// // Creates a User model using the defined schema and exports it for use in other parts of the application
// export const User = mongoose.model<UserDocument>('User', UserSchema)
