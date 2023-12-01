import { prisma } from "../../database/repositoryClient"
import utilsCrypt from '../../utils/crypt'
import { sign } from 'jsonwebtoken';

export class LabelUseCase{
    async createLabel({ name, description, departmentId }){
        try {
            const newLabel = await prisma.label.create({
                data: {
                  name,
                  description,
                  departmentId,
                }
            })
            return newLabel
        } catch (error) {
           throw new Error(error) 
        }
    }

    async getLabelById({ id }) {
        try {
            const label = await prisma.label.findUnique({
                where: { id: id },
            });

            return label
        } catch (error) {
            throw new Error(error) 
        }
    }

    
    async updateLabel({ id, name, description, departmentId }) {
        try {
            const updatedLabel = await prisma.label.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    description,
                    departmentId, 
                }
            })
            return updatedLabel
        } catch (error) {
            throw new Error(error) 
        }
    }

    async deleteLabel({id}) {
        try {
            const deletedLabel = await prisma.label.delete({
                where: {
                    id: id
                }
            })
            return deletedLabel
        } catch (error) {
            throw new Error(error) 
        }
    }
    
    async listLabels({}) {
        try {
            const allLabels = await prisma.label.findMany({ })
            return allLabels
        } catch (error) {
            throw new Error(error) 
        }
    }
}