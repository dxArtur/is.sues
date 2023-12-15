import { Request, Response } from 'express'
import { CompanyUseCase } from '../modules/company/companyUseCase'
import { createCompanySchema, updateCompanySchema } from '../schamas/companySchema';
import { ZodError } from 'zod';

export class CompanyController {

    private caseUse:CompanyUseCase

    constructor(companyUseCase: CompanyUseCase) {
      this.caseUse = companyUseCase
    }

    createCompany = async(req: Request, res: Response) =>{
        try {
            const validatedData = createCompanySchema.parse(req.body);
            const response = await this.caseUse.createCompany(validatedData);
            return res.status(200).json(response);
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    success: false, 
                    error: "Dados de entrada inválidos", 
                    validationErrors: error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message
                    }))
                });
            }
            return res.status(500).json({ success: false, error: "Erro interno do servidor" });
        }
    }
    getCompanyById = async(req: Request, res: Response) => {
        const { id } = req.params;
        console.log('ID recebido:', id); 
        const response = await this.caseUse.getCompanyById({ id })
        return res.status(200).json(response)
    }

    updateCompany = async(req: Request, res: Response) => {
        try {
            const validatedData = updateCompanySchema.parse({ ...req.params, ...req.body });
            const response = await this.caseUse.updateCompany(validatedData);
            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    success: false, 
                    error: "Dados de entrada inválidos", 
                    validationErrors: error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message
                    }))
                });
            }
            return res.status(500).json({ success: false, error: "Erro interno do servidor" });
        }
    }

    deleteCompany = async(req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.caseUse.deleteCompany({ id })
        return res.status(200).json(response)
    }
    
    getAllCompanies = async(req: Request, res: Response) => {
        const response = await this.caseUse.listCompanies({})
        return res.status(200).json(response)
    }

    deleteAllCompanies = async(req: Request, res: Response) => {
        const response = await this.caseUse.deleteAllCompanies({})
        return res.status(200).json(response)
    }
}