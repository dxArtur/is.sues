import { Router } from 'express';
import { UserController } from '../controllers/users-controllers'; 
import { UserUseCase } from '../modules/users/userUseCases';
import { prisma } from '../database/repositoryClient';
import { upload } from '../middlewares/multerPhoto';

const router = Router();
const userUseCase = new UserUseCase(prisma);
const userController = new UserController(userUseCase);

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - occupation
 *         - adm
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         occupation:
 *           type: string
 *           description: Ocupação do usuário
 *         adm:
 *           type: boolean
 *           description: Indica se o usuário é administrador
 *         photo:
 *           type: string
 *           description: Foto do usuário (opcional)
 *         departmentId:
 *           type: string
 *           description: ID do departamento (opcional)
 *       example:
 *         name: "João Silva"
 *         email: "joao@example.com"
 *         password: "senha123"
 *         occupation: "Developer"
 *         adm: true
 *         photo: "link_para_foto"
 *         departmentId: "dept123"
 * 
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário (opcional)
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário (opcional)
 *         password:
 *           type: string
 *           description: Senha do usuário (mínimo 6 caracteres, opcional)
 *         occupation:
 *           type: string
 *           description: Ocupação do usuário (opcional)
 *         adm:
 *           type: boolean
 *           description: Indica se o usuário é administrador (opcional)
 *         photo:
 *           type: string
 *           description: Foto do usuário (opcional)
 *         departmentId:
 *           type: string
 *           description: ID do departamento (opcional)
 *       example:
 *         name: "Maria Silva"
 *         email: "maria@example.com"
 *         occupation: "Manager"
 *         adm: false
 * 
 *     SignInUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário (mínimo 6 caracteres)
 *       example:
 *         email: "joao@example.com"
 *         password: "senha123"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpUser'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/', userController.signup);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SignUpUser'
 */
router.get('/', userController.listUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpUser'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', userController.updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', userController.deleteUserById);

/**
 * @swagger
 * /users/{id}/profile-picture:
 *   post:
 *     summary: Adiciona uma foto de perfil para o usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil atualizada com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/:id/profile-picture', upload.single('profilePicture'), userController.updateProfilePicture);

/**
 * @swagger
* /users/{id}/issues:
*  get:
*    summary: "Obtém todas as issues criadas por um usuário"
*    description: "Retorna uma lista de issues criadas por um usuário específico identificado por seu ID."
*    tags:
*      - Users
*    parameters:
*      - in: path
*        name: id
*        required: true
*        schema:
*          type: string
*        description: "ID do usuário"
*    responses:
*      200:
*        description: "Lista de issues do usuário"
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Issue'
*      404:
*        description: "Nenhuma issue encontrada para este usuário"
*      500:
*        description: "Erro interno do servidor"
*
*/
router.get('/:id/issues', userController.getUserIssues);

export default router;
