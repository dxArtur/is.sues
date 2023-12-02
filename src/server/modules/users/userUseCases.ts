import { PrismaClient } from "@prisma/client";
import { UserDto } from "../../../dtos/UserDTO";
import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'
import { sign } from 'jsonwebtoken';

export class UserUseCase{
  private repository: PrismaClient

  constructor(repository: PrismaClient) {
    this.repository = repository
  }

  async signin({email, password}:UserDto) {
      const userAttempAuth = await this.repository.user.findFirstOrThrow({
          where: {
            email: email,
          }
        })
  
        if ( !userAttempAuth ) {
          throw new Error ('User not found');
        }
  
        const matchKeys = await utilsCrypt.match(password, userAttempAuth.password)
  
        if( ! matchKeys ) {
          throw new Error ('keys not match')
        }
  
        const token = sign(
          {
            name:userAttempAuth.name,
            department: userAttempAuth.departmentId
          },
          process.env.SECRET!,
          {
            expiresIn:'1h',
            algorithm:'HS256',
            subject: userAttempAuth.id
          }
        )

        return {token, userAttempAuth}
  }

  async signup({name, email, password, departmentId, occupation, adm, photo}:UserDto) {
      const verifyExistUser = await this.repository.user.findFirst({
          where:{
            email
          }
        })
        if(verifyExistUser){
          throw new Error('User already exists')
        }
      const hashedPassword = await utilsCrypt.cryptPass(password)
      const newUser = await this.repository.user.create({
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

      return newUser
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

  async updateUser({id, name, email, password, departmentId, occupation, adm, photo}:UserDto) {
    const hashedPassword = await utilsCrypt.cryptPass(password)

    const updatedUser = await this.repository.user.update({
      where: {
        id: id,
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
      throw new Error('User not found')
    }

    return updatedUser
  }

  async deleteUser({id}:UserDto) {
    const userAttempDeleted = await this.repository.user.delete({
      where: {
        id: id
      }
    })

    if (!userAttempDeleted) {
      throw new Error('User not found')
    }

    return userAttempDeleted
  }


}