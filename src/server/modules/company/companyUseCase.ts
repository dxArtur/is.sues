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
                    latitude: validatedData.latitude,
                    longitude: validatedData.longitude,
                    description: validatedData.description,
                    headid: validatedData.headid,
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
                    ...(validatedData.name && { name: validatedData.name }),
                    ...(validatedData.email && { email: validatedData.email }),
                    ...(hashedPassword && { password: hashedPassword }),
                    ...(validatedData.description && { description: validatedData.description }),
                    ...(validatedData.departments && { departments: { connect: validatedData.departments.map(depId => ({ id: depId })) } }),
                    ...(validatedData.latitude != null && { latitude: validatedData.latitude }),
                    ...(validatedData.longitude != null && { longitude: validatedData.longitude }),
                    ...(validatedData.headid && { headid: validatedData.headid }),
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

    async deleteCompany({id}: { id: string }) {
        try {
            console.log(id);
            const deletedCompany = await prisma.company.delete({
                where: {
                    id: id
                }
            });
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