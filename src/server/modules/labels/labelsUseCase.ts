import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'
import { CreateLabelDto, GetLabelByIdDTO, UpdateLabelDto } from "../../dtos/LabelDTO"
import { sign } from 'jsonwebtoken';

export class LabelUseCase{
    async createLabel(labelData: CreateLabelDto) {
        try {
            const newLabel = await prisma.label.create({
                data: {
                    name: labelData.name,
                    description: labelData.description,
                    department: { connect: { id: labelData.departmentId } }
                }
            });

            return newLabel;
        } catch (error) {
            throw new Error("Erro ao criar o label.");
        }
    }

    async getLabelById({ id }: GetLabelByIdDTO) {
        try {
            const label = await prisma.label.findUnique({
                where: { id },
            });

            return label;
        } catch (error) {
            throw new Error("Erro ao buscar o label.");
        }
    }
    async updateLabel(labelData: UpdateLabelDto) {
        try {
            const updatedLabel = await prisma.label.update({
                where: { id: labelData.id },
                data: {
                    ...(labelData.name && { name: labelData.name }),
                    ...(labelData.description && { description: labelData.description }),
                    ...(labelData.departmentId && { department: { connect: { id: labelData.departmentId } } })
                }
            });

            return updatedLabel;
        } catch (error) {
            throw new Error("Erro ao atualizar o label.");
        }
    }

    async deleteLabel({ id }: { id: number }) {
        try {
            const deletedLabel = await prisma.label.delete({
                where: { id }
            });
            return deletedLabel;
        } catch (error) {
            throw new Error("Erro ao deletar o label.");
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