import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, idDepartamento, occupation, photo } = req.body;

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          idDepartamento,
          occupation,
          photo,
        },
      });

      res.status(201).json({ message: 'User created successfully', content: newUser });
    } catch (error) {
      res.status(500).json({ error: error });
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
      const { name, email, idDepartamento, occupation, photo } = req.body;

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          idDepartamento,
          occupation,
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
};
