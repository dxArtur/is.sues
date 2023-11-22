import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import utilsCrypt from '../utils/crypt'
import { sign } from 'jsonwebtoken';
import { AuthenticateDTO } from '../models/AuthenticationDTO';

const prisma = new PrismaClient();

interface IData{
  user: AuthenticateDTO;
  token: string
}

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, departmentId, occupation, adm, photo } = req.body;

      const hashedPassword = await utilsCrypt.cryptPass(password)
      console.log(hashedPassword)

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          departmentId,
          occupation,
          adm,
          photo,
        },
      });

      res.status(201).json({ message: 'User created successfully', content: newUser });
    } catch (error) {
      console.log(error)
    }
  },

  async listUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      
      if (!users || users.length === 0) {
        res.status(404).json({ message: 'No user records found' });
      }

      res.status(200).json({ message: 'All users', content: users });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User found', content: user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async updateUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { name, email, password, departmentId, occupation, adm, photo } = req.body

      const hashedPassword = await utilsCrypt.cryptPass(password)

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          password: hashedPassword,
          departmentId,
          occupation,
          adm,
          photo,
        },
      });

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated', content: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async deleteUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted', content: deletedUser });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async signin(req: Request, res: Response) {
    try {
      const {email, password} = req.body
      const userTryLogin = await prisma.user.findFirstOrThrow({
        where: {
          email: email,
        }
      })

      if ( !userTryLogin ) {
        res.status(404).json({ message: 'User not found' }); 
      }

      const matchKeys = await utilsCrypt.match(password, userTryLogin.password)

      if( ! matchKeys ) {
        res.status(500).json({ message: 'keys not match' });
      }

      const token = sign(
        {
          name:userTryLogin.name,
          department: userTryLogin.departmentId
        },
        process.env.SECRET,
        {
          expiresIn:'1m',
          algorithm:'HS256',
          subject: String(userTryLogin.id)
        }
      )

        res.status(200).json({ message: 'the token is', content: token });
        //return {token, user:userTryLogin}
    } catch (error) {
      throw new Error ('error during signin')
    }
  }
};
