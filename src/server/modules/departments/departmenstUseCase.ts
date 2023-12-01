import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'

export class DepartmentUseCase{
    async createDepartment({ name, companyId }){
        try {
            const newCompany = await prisma.department.create({
                data: {
                    name,
                    companyId
                }
            })

            return newCompany

        } catch (error) {
           throw new Error(error) 
        }

    }

    async getDepartmentsById({id}) {
        try {
            const company = await prisma.department.findUnique({
                where: { id: id },
            });

            return company
        } catch (error) {
            throw new Error(error) 
        }
    }

    
    async updateDepartment({id, name, companyId}) {
        const hashedPassword = await utilsCrypt.cryptPass(password)
        try {
            const updatedDepartment = await prisma.department.update({
                where:{
                    id:id
                },
                data:{
                    name,
                    companyId
                }
            })
            return updatedDepartment
        } catch (error) {
            throw new Error(error) 
        }
    }

    async deleteDepartment({id}) {
        try {
            const deletedDepartment = await prisma.department.delete({
                where: {
                    id:id
                }
            })
            return deletedDepartment
        } catch (error) {
            throw new Error(error) 
        }
    }
    
    async listDepartments({}) {
        try {
            const allDepartments = await prisma.department.findMany({})
            return allDepartments
        } catch (error) {
            throw new Error(error) 
        }
    }
}