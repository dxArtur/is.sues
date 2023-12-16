import { Request, Response, NextFunction } from 'express'
import { UserUseCase } from '../modules/users/userUseCases'
import { signUpSchema, idUserSchema, updateUserSchema, signinSchema } from '../schamas/userSchema';
import { ZodError } from 'zod';

export class UserController {
  private caseUse:UserUseCase

  constructor(userUseCase: UserUseCase) {
    this.caseUse = userUseCase;
  }

  
  signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userData = signUpSchema.parse(req.body);
      const response = await this.caseUse.signup(userData);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
          return res.status(400).json({ 
              error: "Dados de entrada inválidos", 
              validationErrors: error.errors.map(e => ({
                  path: e.path.join('.'),
                  message: e.message
              }))
          });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };

  listUsers= async(req: Request, res: Response):Promise<Response> =>{
    const response = await this.caseUse.listUsers()
    return res.status(200).json(response)
  }

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      idUserSchema.parse(id); // Valide o ID usando o esquema Zod
      const response = await this.caseUse.getUserById({ id });
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
          return res.status(400).json({ 
              error: "Dados de entrada inválidos", 
              validationErrors: error.errors.map(e => ({
                  path: e.path.join('.'),
                  message: e.message
              }))
          });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };

  updateUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password, departmentId, occupation, adm, photo } = req.body;
      const id = req.params.id;
      updateUserSchema.parse({
        name,
        email,
        password,
        departmentId,
        occupation,
        adm,
        photo,
      });
  
      const response = await this.caseUse.updateUser({ id, name, email, password, departmentId, occupation, adm, photo });
      return res.status(200).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ 
                error: "Dados de entrada inválidos", 
                validationErrors: error.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
  };

  deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      idUserSchema.parse(id);
  
      const response = await this.caseUse.deleteUser({ id });
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
          return res.status(400).json({ 
              error: "Dados de entrada inválidos", 
              validationErrors: error.errors.map(e => ({
                  path: e.path.join('.'),
                  message: e.message
              }))
          });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };

  signin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = signinSchema.parse(req.body);
  
      const response = await this.caseUse.signin({ email, password });
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
          return res.status(400).json({ 
              error: "Dados de entrada inválidos", 
              validationErrors: error.errors.map(e => ({
                  path: e.path.join('.'),
                  message: e.message
              }))
          });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
}
