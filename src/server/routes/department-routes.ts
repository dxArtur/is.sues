import { Router } from 'express';
import { DepartmentController } from '../controllers/department-controller';
import { DepartmentUseCase } from '../modules/departments/departmenstUseCase';

const router = Router()
const departmenstUseCase = new DepartmentUseCase
const departmentController = new DepartmentController(departmenstUseCase)

router.post('/departments/new', departmentController.createDepartment);
router.get('/departments/all', departmentController.getAllDepartments);
router.get('/departments/:id', departmentController.getDepartmentById);
router.put('/departments/:id', departmentController.updateDepartment);
router.delete('/departments/:id', departmentController.deleteDepartment);

export default router;
