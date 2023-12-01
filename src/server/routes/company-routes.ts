import { Router } from 'express';
import { CompanyController } from '../controllers/company-controller';
import { CompanyUseCase } from '../modules/company/companyUseCase'

const router = Router()
const companyUseCase = new CompanyUseCase
const companyController = new CompanyController(companyUseCase)

router.post('/company', companyController.createCompany);
router.get('/company/all', companyController.getAllCompanies);
router.delete('/company/all', companyController.deleteAllCompanies);
router.get('/company/:companyId', companyController.getCompanyById);
router.put('/company/:companyId', companyController.updateCompany);
router.delete('/company/:companyId', companyController.deleteCompany);

export default router;
