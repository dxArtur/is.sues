import { CompanyDto } from "../../../dtos/CompanyDTO"
import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'


export class CompanyUseCase{
    async createCompany({ name, email, password, description, departments}){
        const hashedPassword = await utilsCrypt.cryptPass(password)
        try {
            const newCompany = await prisma.company.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    description,
                    departments
                }
            })

            return newCompany

        } catch (error) {
           throw new Error(error) 
        }
    }

    async getCompanyById({id}:CompanyDto) {
        try {
            const company = await prisma.company.findUnique({
                where: { id: id },
            });

            return company
        } catch (error) {
            throw new Error(error) 
        }
    }

    
    async updateCompany({id, name, email, password, description, departments}:CompanyDto) {
        const hashedPassword = await utilsCrypt.cryptPass(password)
        try {
            const updatedCompany = await prisma.company.update({
                where: { id: id },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    description,
                    departments
                },
            })

            return updatedCompany            
        } catch (error) {
            throw new Error(error) 
        }
    }

    async deleteCompany({id}:CompanyDto) {
        try {
            const deletedCompany = await prisma.company.delete({
                where: {
                    id: id
                }
            })

            return deletedCompany            
        } catch (error) {
            throw new Error(error) 
        }
    }
    
    async listCompanies({}) {
        try {
            const allCompanies = await prisma.company.findMany()
            return allCompanies
        } catch (error) {
            throw new Error(error) 
        }
    }

    async deleteAllCompanies({}) {
        try{
            const deleteAllCompanies = await prisma.company.deleteMany()
            return deleteAllCompanies
        } catch (error) {
            throw new Error(error) 
        }
    }
}