import { Router } from 'express';
import { CompanyController } from '../controllers/company-controller';
import { CompanyUseCase } from '../modules/company/companyUseCase'
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"

const router = Router()
const companyUseCase = new CompanyUseCase
const companyController = new CompanyController(companyUseCase)

router.post('/company/new', companyController.createCompany);
router.get('/company/all', companyController.getAllCompanies);
router.delete('/company/all', verifyTokenAuthentication, verifyAdminAuth,companyController.deleteAllCompanies);
router.get('/company/:id', companyController.getCompanyById);
router.put('/company/:id', verifyTokenAuthentication, verifyAdminAuth, companyController.updateCompany);
router.delete('/company/:id', verifyTokenAuthentication, verifyAdminAuth, companyController.deleteCompany);

export default router;
