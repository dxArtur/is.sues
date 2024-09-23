import { Request, Response, NextFunction } from 'express'
import { v2 as cloudinary } from 'cloudinary';
import { UserUseCase } from '../modules/users/userUseCases'
import { upload } from '../middlewares/multerPhoto';
import { signUpSchema, idUserSchema, updateUserSchema, signinSchema } from '../schamas/userSchema';
import { ZodError } from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      console.log(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };

  getUserIssues = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const response = await this.caseUse.getUserIssues(id);
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
      console.log(error);
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
      console.log(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
  /*updateProfilePicture = async (req: Request, res: Response) : Promise<Response> =>  {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
        }
        const updatedUser = await this.caseUse.updateProfilePicture({id}, file);
        return res.status(200).json({ 
            message: 'Imagem do perfil atualizada com sucesso.',
            user: updatedUser 
        });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro detectado:", error.message);
        return res.status(500).json({ error: error.message });
        } else {
            console.error("Erro desconhecido:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
  };*/
  updateProfilePicture = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
      }

      // Upload da imagem diretamente do buffer para o Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'profile_pictures' }, // Pasta onde as imagens serão armazenadas no Cloudinary
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(file.buffer); // Envia o buffer da imagem para o Cloudinary
      });

      // Salva a URL da imagem no banco de dados
      const updatedUser = await this.caseUse.updateProfilePicture({ id }, (uploadResult as any).secure_url);

      return res.status(200).json({
        message: 'Imagem do perfil atualizada com sucesso.',
        user: updatedUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao atualizar a imagem do perfil:', error.message);
        return res.status(500).json({ error: error.message });
      }
      console.error('Erro desconhecido:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };
  getAssignedIssues = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const issues = await this.caseUse.getAssignedIssues(userId);
      return res.status(200).json(issues);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar as issues atribuídas' });
    }
  }
}
