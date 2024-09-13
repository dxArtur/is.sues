
import express from 'express';
import { LabelUseCase } from '../modules/labels/labelsUseCase';
import { LabelController } from '../controllers/labels-controller';
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"

const router = express.Router()
const labelUseCase = new LabelUseCase()
const labelController = new LabelController(labelUseCase)

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateLabel:
 *       type: object
 *       required:
 *         - name
 *         - departmentId
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do label
 *         description:
 *           type: string
 *           description: Descrição do label (opcional)
 *         departmentId:
 *           type: string
 *           format: uuid
 *           description: ID do departamento
 *       example:
 *         name: "Bug"
 *         description: "Problemas relacionados a bugs"
 *         departmentId: "d123e4567-e89b-12d3-a456-426614174000"
 * 
 *     UpdateLabel:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do label
 *         name:
 *           type: string
 *           description: Nome do label (opcional)
 *         description:
 *           type: string
 *           description: Descrição do label (opcional)
 *         departmentId:
 *           type: string
 *           format: uuid
 *           description: ID do departamento (opcional)
 *       example:
 *         id: 1
 *         name: "Bug Atualizado"
 *         description: "Atualizado para problemas críticos"
 *         departmentId: "d123e4567-e89b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * /labels:
 *   post:
 *     summary: Cria um novo label
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLabel'
 *     responses:
 *       201:
 *         description: Label criado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 */
router.post('/labels', verifyTokenAuthentication, verifyAdminAuth, labelController.createLabel);

/**
 * @swagger
 * /labels/{id}:
 *   get:
 *     summary: Busca um label por ID
 *     tags: [Labels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do label
 *     responses:
 *       200:
 *         description: Label encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateLabel'
 *       404:
 *         description: Label não encontrado
 */
router.get('/labels/:id', labelController.getLabelById);

/**
 * @swagger
 * /labels/{id}:
 *   put:
 *     summary: Atualiza um label por ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do label
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLabel'
 *     responses:
 *       200:
 *         description: Label atualizado com sucesso
 *       404:
 *         description: Label não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 */
router.put('/labels/:id', verifyTokenAuthentication, verifyAdminAuth, labelController.updateLabel);

/**
 * @swagger
 * /labels/{id}:
 *   delete:
 *     summary: Exclui um label por ID
 *     tags: [Labels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do label
 *     responses:
 *       204:
 *         description: Label excluído com sucesso
 *       404:
 *         description: Label não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Apenas administradores podem realizar esta ação
 */
router.delete('/labels/:id', verifyTokenAuthentication, verifyAdminAuth, labelController.deletedLabel);

/**
 * @swagger
 * /labels:
 *   get:
 *     summary: Lista todos os labels
 *     tags: [Labels]
 *     responses:
 *       200:
 *         description: Lista de labels retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateLabel'
 */
router.get('/labels', labelController.listLabels);

export default router;
