
import { Router } from 'express';
import { DepartmentController } from '../controllers/department-controller';
import { DepartmentUseCase } from '../modules/departments/departmenstUseCase';
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"

const router = Router()
const departmenstUseCase = new DepartmentUseCase()
const departmentController = new DepartmentController(departmenstUseCase)

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDepartment:
 *       type: object
 *       required:
 *         - name
 *         - companyId
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do departamento
 *         companyId:
 *           type: string
 *           format: uuid
 *           description: ID da empresa
 *       example:
 *         name: "Departamento de TI"
 *         companyId: "c123e4567-e89b-12d3-a456-426614174000"
 * 
 *     UpdateDepartment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID do departamento
 *         name:
 *           type: string
 *           description: Nome do departamento (opcional)
 *         companyId:
 *           type: string
 *           format: uuid
 *           description: ID da empresa (opcional)
 *       example:
 *         id: "d123e4567-e89b-12d3-a456-426614174000"
 *         name: "Departamento de Marketing"
 *         companyId: "c123e4567-e89b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * /departments/new:
 *   post:
 *     summary: Cria um novo departamento
 *     tags: [Departamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartment'
 *     responses:
 *       201:
 *         description: Departamento criado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/departments/new', verifyTokenAuthentication, verifyAdminAuth, departmentController.createDepartment);

/**
 * @swagger
 * /departments/all:
 *   get:
 *     summary: Lista todos os departamentos
 *     tags: [Departamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de departamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateDepartment'
 *       401:
 *         description: Não autorizado
 */
router.get('/departments/all', verifyTokenAuthentication, departmentController.getAllDepartments);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Busca um departamento por ID
 *     tags: [Departamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDepartment'
 *       404:
 *         description: Departamento não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/departments/:id', verifyTokenAuthentication, departmentController.getDepartmentById);

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Atualiza um departamento por ID
 *     tags: [Departamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDepartment'
 *     responses:
 *       200:
 *         description: Departamento atualizado com sucesso
 *       404:
 *         description: Departamento não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 */
router.put('/departments/:id', verifyTokenAuthentication, verifyAdminAuth, departmentController.updateDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Exclui um departamento por ID
 *     tags: [Departamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do departamento
 *     responses:
 *       204:
 *         description: Departamento excluído com sucesso
 *       404:
 *         description: Departamento não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 */
router.delete('/departments/:id', verifyTokenAuthentication, verifyAdminAuth, departmentController.deleteDepartment);

export default router;
