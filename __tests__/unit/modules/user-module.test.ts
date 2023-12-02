import { PrismaClient } from '@prisma/client'
import { prisma } from '../../../src/server/database/repositoryClient'
import {UserUseCase} from '../../../src/server/modules/users/userUseCases'
import { UserDto } from '../../../src/dtos/UserDTO'
import { CompanyDto } from '../../../src/dtos/CompanyDTO'
import { DepartmentDto } from '../../../src/dtos/DepartmentDTO'

jest.mock('../../../src/server/database/repositoryClient')

describe('User use cases', ()=>{
    let repositoryTest: PrismaClient
    let userUseCases: UserUseCase
    let company:CompanyDto
    let department: DepartmentDto

    beforeEach(async()=>{
        repositoryTest = new PrismaClient()
        userUseCases = new UserUseCase(repositoryTest)

        company = await repositoryTest.company.create({
            data:{
                name: "empresa teste",
                email: "emailparatestedaempresa@example.com",
                password: "senha",
                description: "empresa de testes"
            }
        })

        department = await repositoryTest.department.create({
            data:{
                name: "departamento de QA",
                companyId: company.id,
                issues: {},
                labels: {},
                users: {}
            }
        })

    })

    afterEach(async()=>{
        await repositoryTest.user.deleteMany({ })
        await repositoryTest.department.deleteMany({ })
        await repositoryTest.company.deleteMany({ })
    })

    describe('Normal flux', ()=> {
        test('Deve ser possível criar um novo usuário com dados válidos', async() => {
            const newUser: UserDto = {
                name: 'Nome Teste',
                email: 'emailTeste@example.com',
                password: 'senha123',
                departmentId: department.id,
                occupation: 'Analista de testes',
                adm: false,
                photo: 'profile.jpg',
              }
            const createdUser = await userUseCases.signup(newUser)  //userUseCases.signup(newUser)
            
            expect(createdUser).toBeDefined()
            expect(createdUser.name).toBe(newUser.name)
            expect(createdUser.email).toBe(newUser.email) 
        }),

        test('Deve ser possível listar todos os usuários criados', async()=> {
            const newUser: UserDto = {
                name: 'Nome Teste',
                email: 'emailTeste@example.com',
                password: 'senha123',
                departmentId: department.id,
                occupation: 'Analista de testes',
                adm: false,
                photo: 'profile.jpg',
            }
            const createdUser = await userUseCases.signup(newUser)
            const allUsers = await userUseCases.listUsers()

            expect(allUsers).toStrictEqual([createdUser])
        }),

        test('Deve ser possível obter um usuário por sua id', async()=>{
            const newUser: UserDto = {
                name: 'Nome Teste',
                email: 'emailTeste@example.com',
                password: 'senha123',
                departmentId: department.id,
                occupation: 'Analista de testes',
                adm: false,
                photo: 'profile.jpg',
            }
            const createdUser = await userUseCases.signup(newUser)
            const {id} = createdUser
            const userSelected = await userUseCases.getUserById({id})

            expect(userSelected.name).toBe(createdUser.name)
        }),

        test('Não deve ser possível adicionar dois usuários com o mesmo email', async()=>{
            const newUser: UserDto = {
                name: 'usuario valido',
                email: 'emailTeste@example.com',
                password: 'senha123',
                departmentId: department.id,
                occupation: 'Analista de testes',
                adm: false,
                photo: 'profile.jpg',
            }

            const userValid = await userUseCases.signup(newUser)
            const userInvalid = await userUseCases.signup(newUser)

            expect(userInvalid).toBeUndefined()
            
        })
        
    })
})