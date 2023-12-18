import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const salvarCoordenadas = async (req: Request, res: Response) => {
  const { nome, latitude, longitude } = req.body;

  try {
    const coordenada = await prisma.coordenada.create({
      data: {
        nome,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });

    res.status(201).json({ message: 'Coordenadas salvas com sucesso', coordenada });
  } catch (error) {
    console.error('Erro ao salvar coordenadas:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao salvar as coordenadas' });
  }
};

export const listarCoordenadas = async (req: Request, res: Response) => {
    try {
      const coordenadas = await prisma.coordenada.findMany(); 
  
      res.status(200).json(coordenadas);
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar as coordenadas' });
    }
  };

  export const deletarCoordenada = async (req: Request, res: Response) => {
    const { id } = req.params; 
  
    try {
      const coordenada = await prisma.coordenada.delete({
        where: { id: parseInt(id) }, 
      });
  
      res.status(200).json({ message: 'Coordenada deletada com sucesso', coordenada });
    } catch (error) {
      console.error('Erro ao deletar coordenada:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao deletar a coordenada' });
    }
  };
