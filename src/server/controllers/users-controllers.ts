import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import utilsCrypt from '../utils/crypt'
import { sign } from 'jsonwebtoken';
import { AuthenticateDTO } from '../models/AuthenticationDTO';
import {userUseCase} from '../modules/users/userUseCases'
const prisma = new PrismaClient();

interface IData{
  user: AuthenticateDTO;
  token: string
}

export class userController {
  private caseUse: userUseCase;

  constructor(userUseCase: userUseCase) {
    this.caseUse = userUseCase;
  }

  async signup(req: Request, res: Response) {
    const { name, email, password, departmentId, occupation, adm, photo } = req.body;
    const response = await this.caseUse.signup({ name, email, password, departmentId, occupation, adm, photo })
    return res.status(200).json(response)
  }

  async listUsers(req: Request, res: Response) {
    const response = await this.caseUse.listUsers()
    return res.status(200).json(response)
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id
    const response = await this.caseUse.getUserById({userId})
    return res.status(200).json(response)
  }

  async updateUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const { name, email, password, departmentId, occupation, adm, photo } = req.body
    const response = await this.caseUse.updateUser({userId, name, email, password, departmentId, occupation, adm, photo})
    return res.status(200).json(response)
  }

  async deleteUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const response = await this.caseUse.deleteUser({userId})
    return res.status(200).json(response)
  },

  async signin(req: Request, res: Response) {
    const {email, password} = req.body
    const caseUse = new userUseCase()
    const response = await caseUse.signin({email, password})
    return res.status(200).json(response)
  }
};
