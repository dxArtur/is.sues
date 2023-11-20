import { Router } from 'express';
import companyController from '../controllers/company-controller';

const router = Router();

router.post('/company', companyController.createCompany);
router.get('/company/all', companyController.getAllCompanies);
router.delete('/company/all', companyController.deleteAllCompanies);
router.get('/company/:companyId', companyController.getCompany);
router.put('/company/:companyId', companyController.updateCompany);
router.delete('/company/:companyId', companyController.deleteCompany);

export default router;
