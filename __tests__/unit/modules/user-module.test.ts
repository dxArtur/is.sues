import { PrismaClient } from '@prisma/client'
import {UserUseCase} from '../../../src/server/modules/users/userUseCases'

jest.mock('../../../src/server/database/repositoryClient')

describe('User use cases', ()=>{
    let repositoryTest: PrismaClient
    let userUseCases: UserUseCase

    beforeEach(()=>{
        repositoryTest = new PrismaClient()
        userUseCases = new UserUseCase(repositoryTest)
    })

    describe('Normal flux', ()=> {
        test('Deve ser possível criar um novo usuário com dados válidos', async() => {
            const newUser = {
                name: 'Nome Teste',
                email: 'emailTeste@example.com',
                password: 'senha123',
                departmentId: 'Departamento de testes',
                occupation: 'Analista de testes',
                adm: false,
                photo: 'profile.jpg',
              }
            const createdUser = await userUseCases.signup(newUser)
            
            expect(createdUser).toBeDefined()
            expect(createdUser.name).toBe(newUser.name)
            expect(createdUser.email).toBe(newUser.email)
            
        }),
        test('Deve ser possível listar todos os usuários criados', ()=> {
            
        })
        
    })

})