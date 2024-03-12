import { Router } from 'express';
import { DepartmentController } from '../controllers/department-controller';
import { DepartmentUseCase } from '../modules/departments/departmenstUseCase';
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"

const router = Router()
const departmenstUseCase = new DepartmentUseCase
const departmentController = new DepartmentController(departmenstUseCase)

router.post('/departments/new', verifyTokenAuthentication, verifyAdminAuth, departmentController.createDepartment);
router.get('/departments/all', verifyTokenAuthentication, departmentController.getAllDepartments);
router.get('/departments/:id', verifyTokenAuthentication, departmentController.getDepartmentById);
router.put('/departments/:id', verifyTokenAuthentication, verifyAdminAuth, departmentController.updateDepartment);
router.delete('/departments/:id', verifyTokenAuthentication, verifyAdminAuth, departmentController.deleteDepartment);

export default router;
