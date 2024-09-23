import { PrismaClient } from "@prisma/client";
import { UsersDto } from "../../dtos/UsersDTO";
import utilsCrypt from '../../utils/crypt'
import { sign } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { prisma } from "../../database/repositoryClient";

export class UserUseCase{
  private repository: PrismaClient

  constructor(repository: PrismaClient) {
    this.repository = repository
  }

  async signin({ email, password }: {email: string, password: string}) {
    const userAttempAuth = await this.repository.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
  
    if (!userAttempAuth) {
      throw new Error('User not found');
    }
  
    const matchKeys = await utilsCrypt.match(password, userAttempAuth.password);
  
    if (!matchKeys) {
      throw new Error('Senha incorreta');
    }
  
    const token = sign(
      {
        name: userAttempAuth.name,
        adm: userAttempAuth.adm,
        department: userAttempAuth.departmentId,
      },
      process.env.SECRET!,
      {
        expiresIn: '20h',
        algorithm: 'HS256',
        subject: userAttempAuth.id,
      }
    );
  
    return { token, userAttempAuth };
  }  

  
  async signup(userData: UsersDto) {
    const verifyExistUser = await this.repository.user.findFirst({
      where: {
        email: userData.email
      }
    });
  
    if (verifyExistUser) {
      throw new Error('User already exists');
    }
  
    const hashedPassword = await utilsCrypt.cryptPass(userData.password);
    const newUser = await this.repository.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        departmentId: userData.departmentId,
        occupation: userData.occupation,
        adm: userData.adm,
        photo: userData.photo,
      },
    });
  
    return newUser;
  } 
  
  async getUserIssues(userId: string) {
    if (!userId) {
      throw new Error("ID de usuário não fornecido");
    }

    // Busca as issues associadas ao usuário no Prisma
    const userIssues = await prisma.issue.findMany({
      where: { authorId: userId },
      include: { department: true },
    });

    if (userIssues.length === 0) {
      throw new Error('Nenhuma issue encontrada para este usuário');
    }

    return userIssues;
  }

  async listUsers() {
    const allUsers = await this.repository.user.findMany({})
    if (!allUsers) {
      throw new Error('No have users Registered')
    }

    return allUsers
  }

  async getUserById({id}: {id: string}) {
    const user = await this.repository.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async updateUser({ id, name, email, password, departmentId, occupation, adm, photo }: UsersDto) {
    const dataToUpdate: any = {
      name,
      email,
      departmentId,
      occupation,
      adm,
      photo,
    };

    // Hash the password only if it's provided
    if (password) {
      dataToUpdate.password = await utilsCrypt.cryptPass(password);
    }

    // Perform the update
    const updatedUser = await this.repository.user.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });
  
    if (!updatedUser) {
      throw new Error('User not found');
    }
  
    return updatedUser;
  }  

  async deleteUser({id}: {id: string}) {
    const user = await this.repository.user.findUnique({
        where: { id: id },
    });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.photo) {
        const filePath = path.join(__dirname, '..', 'uploads', path.basename(user.photo));
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Erro ao excluir a imagem do perfil:", err);
            }
        });
    }

    const userAttempDeleted = await this.repository.user.delete({
        where: { id: id }
    });

    return userAttempDeleted;
  }

  async updateProfilePicture({ id }: { id: string }, imageUrl: string) {
    try {
      // Atualiza o registro do usuário no banco de dados com a nova URL da imagem
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { photo: imageUrl }, // Salva a URL da imagem no campo 'photo'
      });

      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar a imagem do perfil no banco de dados:', error);
      throw new Error('Erro ao atualizar o usuário no banco de dados.');
    }
  }
  /*async updateProfilePicture({id}: {id: string}, file: Express.Multer.File) {
    if (!file) {
        throw new Error('Nenhum arquivo foi enviado.');
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.filename);

    const updatedUser = await this.repository.user.update({
        where: { id: id },
        data: {
            photo: filePath
        }
    });

    return updatedUser;
  }*/
  async getAssignedIssues(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        assignedIssues: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user.assignedIssues;
  }

}