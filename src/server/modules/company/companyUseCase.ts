import { CompanyDto, UpdateCompanyDto } from "../../dtos/CompanyDTO"
import { CompanyIdDto } from "../../dtos/CompanyIdDTO"
import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'
import { createCompanySchema, updateCompanySchema } from '../../schamas/companySchema';
import { ZodError } from 'zod';
import { ValidationError, DatabaseError } from '../../Error/CustomError';

export class CompanyUseCase {
    async createCompany(companyData: CompanyDto) {
        try {
            const validatedData = createCompanySchema.parse(companyData);
            const hashedPassword = await utilsCrypt.cryptPass(validatedData.password);

            const newCompany = await prisma.company.create({
                data: {
                    name: validatedData.name,
                    email: validatedData.email,
                    password: hashedPassword,
                    description: validatedData.description,
                }
            });

            return newCompany;

        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao criar a empresa.");
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
    async updateCompany(updateData: UpdateCompanyDto) {
        try {
            // Valida os dados de entrada
            const validatedData = updateCompanySchema.parse(updateData);
    
            let hashedPassword;
            if (validatedData.password) {
                hashedPassword = await utilsCrypt.cryptPass(validatedData.password);
            }
    
            const updatedCompany = await prisma.company.update({
                where: { id: validatedData.id },
                data: {
                    name: validatedData.name,
                    email: validatedData.email,
                    password: hashedPassword,
                    description: validatedData.description,
                    departments: validatedData.departments ? {
                        connect: validatedData.departments.map(depId => ({ id: depId })),
                    } : undefined,
                },
            });
    
            return updatedCompany;
    
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao atualizar a empresa.");
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

    async deleteAllCompanies() {
        try{
            const deleteAllCompanies = await prisma.company.deleteMany()
            return deleteAllCompanies
        } catch (error) {
            throw new Error("Erro ao deletar empresas.");
        } 
    }
}