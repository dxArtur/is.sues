import { prisma } from "../../database/repositoryClient"
import { DepartmentCreateDto, UpdateDepartmentDto } from "../../../dtos/DepartmentDTO"
import utilsCrypt from '../../utils/crypt'

export class DepartmentUseCase{
    async createDepartment({ name, companyId }: DepartmentCreateDto) {
        try {
            const newDepartment = await prisma.department.create({
                data: {
                    name,
                    company: {
                        connect: { id: companyId }
                    }
                }
            })

            return newDepartment;

        } catch (error) {
           throw new Error("Erro ao criar o departamento.");
        }
    }

    async getDepartmentsById({ id }: { id: string }) {
        try {
            const department = await prisma.department.findUnique({
                where: { id },
            });

            if (!department) {
                throw new Error("Departamento não encontrado");
            }

            return department;
        } catch (error) {
            throw new Error("Erro ao buscar o departamento.");
        }
    }

    
    async updateDepartment({ id, name, companyId }: UpdateDepartmentDto) {
        try {
            const updatedDepartment = await prisma.department.update({
                where: { id },
                data: {
                    name,
                    companyId
                }
            });
            return updatedDepartment;
        } catch (error) {
            throw new Error("Erro ao atualizar o departamento.");
        }
    }

    async deleteDepartment({ id }: { id: string }) {
        try {
            const deletedDepartment = await prisma.department.delete({
                where: { id }
            });
            return deletedDepartment;
        } catch (error) {
            throw new Error("Erro ao deletar o departamento.");
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