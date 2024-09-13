import { Router } from 'express';
import { CompanyController } from '../controllers/company-controller';
import { CompanyUseCase } from '../modules/company/companyUseCase'
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"

const router = Router()
const companyUseCase = new CompanyUseCase
const companyController = new CompanyController(companyUseCase)

/**
 * @swagger
 * /company/new:
 *   post:
 *     summary: Cria uma nova empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da empresa
 *               email:
 *                 type: string
 *                 description: Email da empresa
 *               password:
 *                 type: string
 *                 description: Senha da empresa
 *               latitude:
 *                 type: number
 *                 description: latitude da empresa
 *               longitude:
 *                 type: number
 *                 description: latitude da empresa
 *               description:
 *                 type: string
 *                 description: descrição da empresa
 *               headid:
 *                 type: string
 *                 description: usuário responsável pela empresa
 *             example:
 *               nome: Empresa Exemplo
 *               endereco: Rua Exemplo, 123
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 */
router.post('/company/new', companyController.createCompany);

/**
 * @swagger
 * /company/all:
 *   get:
 *     summary: Lista todas as empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   endereco:
 *                     type: string
 *                 example:
 *                   id: 1
 *                   nome: Empresa Exemplo
 *                   endereco: Rua Exemplo, 123
 */
router.get('/company/all', companyController.getAllCompanies);

/**
 * @swagger
 * /company/all:
 *   delete:
 *     summary: Exclui todas as empresas (Apenas admins)
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Todas as empresas foram excluídas
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 */
router.delete('/company/all', verifyTokenAuthentication, verifyAdminAuth, companyController.deleteAllCompanies);

/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Busca uma empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 endereco:
 *                   type: string
 *               example:
 *                 id: 1
 *                 nome: Empresa Exemplo
 *                 endereco: Rua Exemplo, 123
 *       404:
 *         description: Empresa não encontrada
 */
router.get('/company/:id', companyController.getCompanyById);

/**
 * @swagger
 * /company/{id}:
 *   put:
 *     summary: Atualiza uma empresa por ID (Apenas admins)
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *             example:
 *               nome: Empresa Atualizada
 *               endereco: Rua Atualizada, 456
 *     responses:
 *       200:
 *         description: Empresa atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 *       404:
 *         description: Empresa não encontrada
 */
router.put('/company/:id', verifyTokenAuthentication, verifyAdminAuth, companyController.updateCompany);

/**
 * @swagger
 * /company/{id}:
 *   delete:
 *     summary: Exclui uma empresa por ID (Apenas admins)
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     responses:
 *       204:
 *         description: Empresa excluída com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 *       404:
 *         description: Empresa não encontrada
 */
router.delete('/company/:id', verifyTokenAuthentication, verifyAdminAuth, companyController.deleteCompany);

export default router;
