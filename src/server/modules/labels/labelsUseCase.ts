import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'
import { CreateLabelDto, GetLabelByIdDTO, UpdateLabelDto } from "../../dtos/LabelDTO"
import { sign } from 'jsonwebtoken';
import { createLabelSchema, labelIdSchema, updateLabelSchema } from '../../schamas/labelSchema';
import { ZodError } from 'zod';
import { ValidationError, DatabaseError } from '../../Error/CustomError';

export class LabelUseCase{
    async createLabel(labelData: CreateLabelDto) {
        try {
            const validatedData = createLabelSchema.parse(labelData);
    
            const newLabel = await prisma.label.create({
                data: {
                    name: validatedData.name,
                    description: validatedData.description,
                    department: { connect: { id: validatedData.departmentId } }
                }
            });
    
            return newLabel;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao criar o label.");
        }
    }

    async getLabelById({ id }: GetLabelByIdDTO) {
        try {
            const validatedData = labelIdSchema.parse({ id });
    
            const label = await prisma.label.findUnique({
                where: { id: validatedData.id },
            });
    
            if (!label) {
                throw new Error("Label não encontrado.");
            }
    
            return label;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao buscar o label.");
        }
    }
    async updateLabel(labelData: UpdateLabelDto) {
        try {
            const validatedData = updateLabelSchema.parse(labelData);
    
            const updatedLabel = await prisma.label.update({
                where: { id: validatedData.id },
                data: {
                    ...(validatedData.name && { name: validatedData.name }),
                    ...(validatedData.description && { description: validatedData.description }),
                    ...(validatedData.departmentId && { department: { connect: { id: validatedData.departmentId } } })
                }
            });
    
            return updatedLabel;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao atualizar o label.");
        }
    }
    

    async deleteLabel({ id }: { id: number }) {
        try {
            const validatedData = labelIdSchema.parse({ id });
    
            const deletedLabel = await prisma.label.delete({
                where: { id: validatedData.id },
            });
    
            return deletedLabel;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ValidationError("Erro de validação", error);
            }
            throw new DatabaseError("Erro ao deletar o label.");
        }
    }
    
    async listLabels({}) {
        try {
            const allLabels = await prisma.label.findMany({ })
            return allLabels
        } catch (error) {
            throw new Error("Erro ao buscar labels.");
        }
    }
}