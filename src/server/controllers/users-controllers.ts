import { Request, Response } from 'express';
import { User } from '../models/user-interface';
import { v4 as uuidv4 } from 'uuid'; 

const users: User[] = [
  {
    id: '1',
    name: 'Nome do Usuário 1',
    email: 'usuario1@example.com',
    idDepartamento: 1,
    occupation: 'Ocupação 1',
    photo: 'caminho/para/foto1.jpg',
  },
  {
    id: '2',
    name: 'Nome do Usuário 2',
    email: 'usuario2@example.com',
    idDepartamento: 2,
    occupation: 'Ocupação 2',
    photo: 'caminho/para/foto2.jpg',
  },

];

// Controlador para criar um novo usuário
export const createUser = (req: Request, res: Response) => {
  const newUser: User = req.body;

 
  const newUserId = uuidv4();

  newUser.id = newUserId;

  users.push(newUser);

  res.status(201).json(newUser);
};

// Controlador para listar todos os usuários
export const listUsers = (req: Request, res: Response) => {
  res.json(users);
};

// Controlador para buscar um usuário por ID
export const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id; 
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' }); 
  }
};

// Controlador para atualizar um usuário por ID
export const updateUserById = (req: Request, res: Response) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    const updatedUser: User = req.body;
    users[userIndex] = { ...users[userIndex], ...updatedUser };

    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

// Controlador para excluir um usuário por ID
export const deleteUserById = (req: Request, res: Response) => {
  const userId = req.params.id; 
  const userIndex = users.findIndex((u) => u.id === userId); 

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' }); 
  }
};