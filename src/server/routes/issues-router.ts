
import Router from "express"
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"
import { IssueUseCase } from "../modules/issues/issueUseCase"
import { IssuesController } from "../controllers/issues-controller"

const router = Router()
const issueUseCase = new IssueUseCase()
const issueController = new IssuesController(issueUseCase)

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateIssue:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - departmentId
 *         - authorId
 *       properties:
 *         title:
 *           type: string
 *           description: Título da issue
 *         description:
 *           type: string
 *           description: Descrição da issue
 *         departmentId:
 *           type: string
 *           format: uuid
 *           description: ID do departamento responsável
 *         authorId:
 *           type: string
 *           format: uuid
 *           description: ID do autor da issue
 *       example:
 *         title: "Falha no sistema"
 *         description: "O sistema não carrega corretamente o dashboard"
 *         departmentId: "d123e4567-e89b-12d3-a456-426614174000"
 *         authorId: "a123e4567-e89b-12d3-a456-426614174000"
 * 
 *     UpdateIssue:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID da issue
 *         title:
 *           type: string
 *           description: Título da issue (opcional)
 *         description:
 *           type: string
 *           description: Descrição da issue (opcional)
 *         status:
 *           type: boolean
 *           description: Status da issue (opcional)
 *         departmentId:
 *           type: string
 *           format: uuid
 *           description: ID do departamento responsável (opcional)
 *         authorId:
 *           type: string
 *           format: uuid
 *           description: ID do autor da issue (opcional)
 *       example:
 *         id: "i123e4567-e89b-12d3-a456-426614174000"
 *         title: "Falha resolvida"
 *         description: "O problema com o dashboard foi corrigido"
 *         status: true
 *         departmentId: "d123e4567-e89b-12d3-a456-426614174000"
 *         authorId: "a123e4567-e89b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * /issues/new:
 *   post:
 *     summary: Cria uma nova issue
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIssue'
 *     responses:
 *       201:
 *         description: Issue criada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/issues/new', verifyTokenAuthentication, issueController.createIssue)

/**
 * @swagger
 * /issues/{id}:
 *   get:
 *     summary: Busca uma issue por ID
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da issue
 *     responses:
 *       200:
 *         description: Issue encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateIssue'
 *       404:
 *         description: Issue não encontrada
 *       401:
 *         description: Não autorizado
 */
router.get('/issues/:id', verifyTokenAuthentication, issueController.getIssueById)

/**
 * @swagger
 * /issues/{id}:
 *   put:
 *     summary: Atualiza uma issue por ID
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da issue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateIssue'
 *     responses:
 *       200:
 *         description: Issue atualizada com sucesso
 *       404:
 *         description: Issue não encontrada
 *       401:
 *         description: Não autorizado
 */
router.put('/issues/:id', verifyTokenAuthentication, issueController.updateIssue)

/**
 * @swagger
 * /issues/{id}:
 *   delete:
 *     summary: Exclui uma issue por ID
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da issue
 *     responses:
 *       204:
 *         description: Issue excluída com sucesso
 *       404:
 *         description: Issue não encontrada
 *       401:
 *         description: Não autorizado
 */
router.delete('/issues/:id', verifyTokenAuthentication, issueController.deleteIssue)

/**
 * @swagger
 * /issues:
 *   get:
 *     summary: Lista todas as issues
 *     tags: [Issues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de issues retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateIssue'
 *       401:
 *         description: Não autorizado
 */
router.get('/issues', verifyTokenAuthentication, issueController.getAllIssues)

export default router
