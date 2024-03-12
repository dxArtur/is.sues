import { prisma } from "../../database/repositoryClient"
import { DepartmentCreateDto, UpdateDepartmentDto } from "../../dtos/DepartmentDTO"
import utilsCrypt from '../../utils/crypt';
import { createDepartmentSchema, departmentIdSchema, updateDepartmentSchema } from '../../schamas/departamentSchema';
import { ZodError } from 'zod';
import { ValidationError, DatabaseError } from '../../Error/CustomError';

export class DepartmentUseCase{
    async createDepartment({ name, companyId }: DepartmentCreateDto) {
        try {
            const validatedData = createDepartmentSchema.parse({ name, companyId });
            const newDepartment = await prisma.department.create({
                data: {
                    name: validatedData.name,
                    company: {
                        connect: { id: validatedData.companyId }
                    }
                }
            });
            return newDepartment;
    
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao criar a departamento.");
        }
    }

    async getDepartmentsById({ id }: { id: string }) {
        try {
            const validatedData = departmentIdSchema.parse({ id });
            const department = await prisma.department.findUnique({
                where: { id: validatedData.id },
            });
    
            if (!department) {
                throw new Error("Departamento não encontrado");
            }
    
            return department;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao buscars o departamento.");
        }
    }

    async updateDepartment(updateData: UpdateDepartmentDto) {
        try {
            const validatedData = updateDepartmentSchema.parse(updateData);
            const updatedDepartment = await prisma.department.update({
                where: { id: validatedData.id },
                data: {
                    name: validatedData.name,
                    companyId: validatedData.companyId
                }
            });
    
            return updatedDepartment;
    
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao atualizar o departamento.");
        }
    }

    async deleteDepartment({ id }: { id: string }) {
        try {
            const validatedData = departmentIdSchema.parse({ id });
    
            const deletedDepartment = await prisma.department.delete({
                where: { id: validatedData.id },
            });
    
            return deletedDepartment;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao deletar o departamento.");
        }
    }
    
    async listDepartments() {
        try {
            const allDepartments = await prisma.department.findMany({});
            return allDepartments;
        } catch (error) {
            throw new Error("Erro ao listar departamentos.");
        }
    }
}