import { Router } from 'express';
import { CompanyController } from '../controllers/company-controller';
import { CompanyUseCase } from '../modules/company/companyUseCase'

const router = Router()
const companyUseCase = new CompanyUseCase
const companyController = new CompanyController(companyUseCase)

router.post('/company', companyController.createCompany);
router.get('/company/all', companyController.getAllCompanies);
router.delete('/company/all', companyController.deleteAllCompanies);
router.get('/company/:id', companyController.getCompanyById);
router.put('/company/:id', companyController.updateCompany);
router.delete('/company/:id', companyController.deleteCompany);

export default router;
