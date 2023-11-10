import { Request, Response } from 'express';
import { prisma } from '../database';

export const listLabels = async (req: Request, res: Response) => {
  try {
    const labels = await prisma.label.findMany();
    res.status(200).json(labels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar as labels.' });
  }
};


export const createLabel = async (req: Request, res: Response) => {
  const { name, description, departmentId } = req.body;
  try {
    const label = await prisma.label.create({
      data: {
        name,
        description,
        departmentId,
      },
    });
    res.status(201).json(label);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar a label.' });
  }
};


export const getLabel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const label = await prisma.label.findUnique({
      where: { id: parseInt(id) },
    });
    if (label) {
      res.status(200).json(label);
    } else {
      res.status(404).json({ message: 'Label não encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a label.' });
  }
};


export const updateLabel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, departmentId } = req.body;
  try {
    const updatedLabel = await prisma.label.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        departmentId,
      },
    });
    res.status(200).json(updatedLabel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar a label.' });
  }
};


export const deleteLabel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.label.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar a label.' });
  }
};

export const labelController = {
  listLabels,
  createLabel,
  getLabel,
  updateLabel,
  deleteLabel,
};
