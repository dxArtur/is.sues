import { Request, Response, NextFunction } from 'express'
import { CompanyUseCase } from '../modules/company/companyUseCase'

export class CompanyController {

    private caseUse:CompanyUseCase

    constructor(companyUseCase: CompanyUseCase) {
      this.caseUse = companyUseCase
    }
    createCompany = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const { name, email, password, latitude, longitude, description, headid, departments } = req.body;
            const response = await this.caseUse.createCompany({ name, email, password, latitude, longitude, description, headid, departments })
            return res.status(200).json(response)
        } catch (error) {
            next(error); // Passa o erro para o próximo middleware (errorHandler)
        }
    }
    getCompanyById = async(req: Request, res: Response) => {
        const { id } = req.params;
        console.log('ID recebido:', id); 
        const response = await this.caseUse.getCompanyById({ id })
        return res.status(200).json(response)
    }
    updateCompany = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name, email, password, description,headid, departments } = req.body;
            const response = await this.caseUse.updateCompany({id, name, email, password, description,headid, departments})
            return res.status(200).json(response)
        } catch (error) {
            next(error); // Passa o erro para o próximo middleware (errorHandler)
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
        const response = await this.caseUse.deleteAllCompanies();
        return res.status(200).json(response);
    }
    getCompanyByHeadId= async(req: Request, res: Response) => {
        const { headId } = req.params;
    
        console.log('Buscando empresa com headid:', headId);
    
        try {
          const company = await this.caseUse.findByHeadId(headId);
    
          if (!company) {
            return res.status(404).json({ error: 'Empresa não encontrada' });
          }
    
          return res.json(company);
        } catch (error) {
          console.error('Erro ao buscar empresa:', error);
          return res.status(500).json({ error: 'Erro ao buscar empresa' });
        }
    }
    
}