import { Request, Response } from 'express'
import { prisma } from '../database'
import utilsCrypt from '../utils/crypt'

export default {
    async createCompany(req: Request, res: Response) {
        const { name, email, password, description, departments } = req.body;
        console.log(req.body)
        const hashedPassword = await utilsCrypt.cryptPass(password)
        console.log(hashedPassword)
        try {
            const company = await prisma.company.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    description,
                    departments
                },
            });
            console.log(company)
            res.status(201).json(company);
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
    },

    async updateCompany(req: Request, res: Response) {
        const { companyId } = req.params;
        const { name, email, password, description, departments } = req.body;
        const hashedPassword = await utilsCrypt.cryptPass(password)
        try {
            const company = await prisma.company.update({
                where: { id: companyId },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    description,
                    departments
                },
            });
            res.status(200).json(company);
        } catch (error) {
            console.log(error)
        }
    },

    async deleteCompany(req: Request, res: Response) {
        const { companyId } = req.params;

        try {
            await prisma.company.delete({
                where: { 
                    id: companyId
                },
            });
            res.status(200).json({ message: 'Company deleted' });
        } catch (error) {
            console.log(error)
        }
    },

    async deleteAllCompanies(req: Request, res: Response) {
        
        try {
            const sucessDeleteAll = await prisma.company.deleteMany()
            if (sucessDeleteAll) {
                res.status(200).json({ message: 'all companies deleted' });
            } else {
                res.status(500).json({ message: 'not deleted' });
            }
        } catch (error) {
            console.log(error)
        }
    },

    async getAllCompanies(req: Request, res: Response) {
        try {
            const companies = await prisma.company.findMany();
            res.status(200).json(companies);
        } catch (error) {
            console.log(error)
        }
    },
};
