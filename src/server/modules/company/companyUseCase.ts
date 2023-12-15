import { CompanyDto, UpdateCompanyDto } from "../../dtos/CompanyDTO"
import { CompanyIdDto } from "../../dtos/CompanyIdDTO"
import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'

export class CompanyUseCase {
    async createCompany({ name, email, password, description }: CompanyDto) {
        const hashedPassword = await utilsCrypt.cryptPass(password);
        try {
            const newCompany = await prisma.company.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    description,
                }
            });

            return newCompany;

        } catch (error) {
            throw new Error("Erro ao criar a empresa.");
        }
    }

    async getCompanyById({ id }: CompanyIdDto) {
        try {
            const company = await prisma.company.findUnique({
                where: { id },
            });

            return company;
        } catch (error) {
            console.error("Erro ao buscar a empresa:", error);
            throw new Error("Erro ao buscar a empresa.");
        }
    }
    async updateCompany({ id, name, email, password, description, departments }: UpdateCompanyDto) {
        let hashedPassword;
        if (password) {
            hashedPassword = await utilsCrypt.cryptPass(password);
        }

        try {
            const updatedCompany = await prisma.company.update({
                where: { id },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    description,
                    departments: departments ? {
                        connect: departments.map(depId => ({ id: depId })),
                    } : undefined,
                },
            });

            return updatedCompany;
        } catch (error) {
            throw new Error("Erro ao atualizar a empresa.");
        } 
    }

    async deleteCompany({id}:CompanyIdDto) {
        try {
            const deletedCompany = await prisma.company.delete({
                where: {
                    id: id
                }
            })

            return deletedCompany            
        } catch (error) {
            throw new Error("Erro ao deletar a empresa.");
        } 
    }
    
    async listCompanies({}) {
        try {
            const allCompanies = await prisma.company.findMany()
            return allCompanies
        } catch (error) {
            throw new Error("Erro ao buscar empresas.");
        } 
    }

    async deleteAllCompanies({}) {
        try{
            const deleteAllCompanies = await prisma.company.deleteMany()
            return deleteAllCompanies
        } catch (error) {
            throw new Error("Erro ao deletar empresas.");
        } 
    }
}