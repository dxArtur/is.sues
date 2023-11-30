import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'
import { sign } from 'jsonwebtoken';

export class userUseCase{
  async signin({email, password}) {
      const userAttempAuth = await prisma.user.findFirstOrThrow({
          where: {
            email: email,
          }
        })
  
        if ( !userAttempAuth ) {
          throw new Error ('User not found');
        }
  
        const matchKeys = await utilsCrypt.match(password, userTryLogin.password)
  
        if( ! matchKeys ) {
          throw new Error ('keys not match')
        }
  
        const token = sign(
          {
            name:userAttempAuth.name,
            department: userAttempAuth.departmentId
          },
          process.env.SECRET,
          {
            expiresIn:'1h',
            algorithm:'HS256',
            subject: userAttempAuth.id
          }
        )

        return {token, userAttempAuth}
  }

  async signup({name, email, password, departmentId, occupation, adm, photo}) {
      const verifyExistUser = await prisma.user.findFirst({
          where:{
            email
          }
        })
        if(verifyExistUser){
          throw new Error('User already exists')
        }
      const hashedPassword = await utilsCrypt.cryptPass(password)
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

      return newUser
  }

  async listUsers() {
    const allUsers = await prisma.user.findMany()
    if (!allUsers) {
      throw new Error('No have users Registered')
    }

    return allUsers
  }

  async getUserById({id}) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async updateUser({userId, name, email, password, departmentId, occupation, adm, photo}) {
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
      throw new Error('User not found')
    }

    return updatedUser
  }

  async deleteUser({userId}) {
    const userAttempDeleted = await prisma.user.delete({
      where: {
        id: userId
      }
    })

    if (!userAttempDeleted) {
      throw new Error('User not found')
    }

    return userAttempDeleted
  }


}