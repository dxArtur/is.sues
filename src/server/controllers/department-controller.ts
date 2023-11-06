import { Request, Response } from 'express';
import { prisma } from '../database';

export default {
    async createDepartment(req: Request, res: Response) {
        try {
            const { name, companyId } = req.body;
            
            const department = await prisma.department.create({
                data: {
                    name,
                    companyId
                }
            });

            res.status(201).json({ message: 'Departamento criado com sucesso', department });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async getDepartment(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const department = await prisma.department.findUnique({
                where: { id }
            });

            if (!department) {
                return res.status(404).json({ message: 'Departamento não encontrado' });
            }

            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async updateDepartment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, companyId } = req.body;

            const department = await prisma.department.update({
                where: { id },
                data: {
                    name,
                    companyId
                }
            });

            res.status(200).json({ message: 'Departamento atualizado com sucesso', department });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async deleteDepartment(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.department.delete({
                where: { id }
            });

            res.status(200).json({ message: 'Departamento deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async getAllDepartments(req: Request, res: Response) {
        try {
            const departments = await prisma.department.findMany();

            res.status(200).json(departments);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
