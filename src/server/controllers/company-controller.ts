import { Request, Response } from 'express';
import { prisma } from '../database';

export default {
    async createCompany(req: Request, res: Response) {
        const { name, description } = req.body;

        try {
            const company = await prisma.company.create({
                data: {
                    name,
                    description,
                },
            });
            res.status(201).json(company);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async getCompany(req: Request, res: Response) {
        const { companyId } = req.params;

        try {
            const company = await prisma.company.findUnique({
                where: { id: companyId },
            });

            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async updateCompany(req: Request, res: Response) {
        const { companyId } = req.params;
        const { name, description } = req.body;

        try {
            const company = await prisma.company.update({
                where: { id: companyId },
                data: {
                    name,
                    description,
                },
            });
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async deleteCompany(req: Request, res: Response) {
        const { companyId } = req.params;

        try {
            await prisma.company.delete({
                where: { id: companyId },
            });
            res.status(200).json({ message: 'Company deleted' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async getAllCompanies(req: Request, res: Response) {
        try {
            const companies = await prisma.company.findMany();
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
};
