import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import {UserUseCase} from '../modules/users/userUseCases'
const prisma = new PrismaClient()

export class UserController {
  private caseUse:UserUseCase

  constructor(userUseCase: UserUseCase) {
    this.caseUse = userUseCase;
  }

  signup  = async(req: Request, res: Response):Promise<Response> =>{
    const { name, email, password, departmentId, occupation, adm, photo } = req.body;
    const response = await this.caseUse.signup({ name, email, password, departmentId, occupation, adm, photo })
    return res.status(200).json(response)
  }

  listUsers= async(req: Request, res: Response):Promise<Response> =>{
    const response = await this.caseUse.listUsers()
    return res.status(200).json(response)
  }

  getUserById = async(req: Request, res: Response):Promise<Response> =>{
    const userId = req.params.id
    const response = await this.caseUse.getUserById({userId})
    return res.status(200).json(response)
  }

  updateUserById = async(req: Request, res: Response):Promise<Response> =>{
    const userId = req.params.id;
    const { name, email, password, departmentId, occupation, adm, photo } = req.body
    const response = await this.caseUse.updateUser({userId, name, email, password, departmentId, occupation, adm, photo})
    return res.status(200).json(response)
  }

  deleteUserById = async(req: Request, res: Response):Promise<Response> =>{
    const userId = req.params.id;
    const response = await this.caseUse.deleteUser({userId})
    return res.status(200).json(response)
  }

  signin = async(req: Request, res: Response):Promise<Response> =>{
    const {email, password} = req.body
    const response = await this.caseUse.signin({email, password})
    return res.status(200).json(response)
  }
}
