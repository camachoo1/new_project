import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserDocument, UserModel } from '../users/user.model';
import { getMongoClient } from '../db';




export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body
  console.log(req.body)

  const hash = await bcrypt.hash(password, 10)

  try {
    const client = await getMongoClient()

    const existingUser = await client.db().collection('users').findOne({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return res.status(400).json({message: 'User already exists',})
    }

    const newUser = new UserModel({
      email,
      username,
      password: hash
    })

    return res.status(200).json(newUser)
  } catch (err) {
    next(err)
  }
}
