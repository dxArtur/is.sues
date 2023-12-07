import { Request, Response } from 'express'
import { CompanyUseCase } from '../modules/company/companyUseCase'

export class CompanyController {

    private caseUse:CompanyUseCase

    constructor(companyUseCase: CompanyUseCase) {
      this.caseUse = companyUseCase
    }

    createCompany = async(req: Request, res: Response) =>{
        const { name, email, password, description, departments } = req.body;
        const response = await this.caseUse.createCompany({ name, email, password, description, departments })
        return res.status(200).json(response)
    }

    getCompanyById = async(req: Request, res: Response) => {
        const { id } = req.params;
        const response = await this.caseUse.getCompanyById({ id })
        return res.status(200).json(response)
    }

    updateCompany = async(req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, password, description, departments } = req.body;
        const response = await this.caseUse.updateCompany({id, name, email, password, description, departments})
        return res.status(200).json(response)
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