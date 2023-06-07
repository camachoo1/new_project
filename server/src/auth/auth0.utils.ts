import { UserDocument, UserModel } from '../users/user.model';
import { Profile } from 'passport-auth0';
const { mongoURI: db } = require('../../config/keys');

// This function takes a `Profile` object as input and creates a new user account document for it in the database

export async function createAccountForAuth0(
  profile: Profile
): Promise<UserDocument> {
  try {
    const user = await UserModel.findOne({ auth0Id: profile.id });

    if (user) {
      return user;
    } else {
      const newUser: UserDocument = new UserModel({
        auth0Id: profile.id,
        email:
          profile.emails && profile.emails[0]
            ? profile.emails[0].value
            : '',
        username: profile.displayName,
      });

      return newUser.save();
    }
  } catch (error) {
    throw new Error('Failed to create user account for Auth0');
  }
}

