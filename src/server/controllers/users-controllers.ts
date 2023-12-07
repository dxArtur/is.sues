import { Request, Response } from 'express'
import { UserUseCase } from '../modules/users/userUseCases'
import { signUpSchema, idUserSchema, updateUserSchema, signinSchema } from '../schamas/userSchema';

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
      return res.status(400).json({ success: false, error: "Dados de entrada inválidos" });
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
        return res.status(400).json({ success: false, error: "ID inválido" })
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
        return res.status(400).json({ success: false, error: "Dados de atualização inválidos" });
      }
  };

  deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      idUserSchema.parse(id);
  
      const response = await this.caseUse.deleteUser({ id });
      return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ success: false, error: "ID inválido"});
    }
  };

  signin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = signinSchema.parse(req.body);
  
      const response = await this.caseUse.signin({ email, password });
      return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ success: false, error: "Dados de entrada inválidos" });
    }
  };
}
