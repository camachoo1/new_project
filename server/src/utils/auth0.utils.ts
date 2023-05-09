import { User } from '../models/user.model'
import { Profile } from 'passport-auth0';
const { mongoURI: db } = require('../../config/keys')


// This function takes a `Profile` object as input and creates a new user account document for it in the database
export function createAccountForAuth0(
  profile: Profile
): Promise<User> {
  // Create a new user document object initialized with the properties from the `profile` object
  const newUser: User = new db.User({
    authZeroUserId: profile.id, // Set the `authZeroUserId` property of the new user document to the `id` property of the `profile` object
    username: profile.displayName, // Set the `username` property of the new user document to the `displayName` property of the `profile` object
    email:
      profile.emails && profile.emails[0] // Check if the `emails` property of the `profile` object is not null or undefined, and if it has an email address at index 0
        ? profile.emails[0].value // If there is an email address at index 0, set the `email` property of the new user document to that email address
        : '', // Otherwise, set the `email` property of the new user document to an empty string
  });

  // Save the new user document to the database using the `.save()` method and return a Promise that resolves with the newly-created user document
  return new db.User(newUser).save();
}
