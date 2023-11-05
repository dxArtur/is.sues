import { Router } from 'express';
import companyController from '../controllers/company-controller';

const router = Router();

router.post('/company', companyController.createCompany);
router.get('/company/all', companyController.getAllCompanies);
router.get('/:companyId', companyController.getCompany);
router.put('/:companyId', companyController.updateCompany);
router.delete('/:companyId', companyController.deleteCompany);

export default router;
