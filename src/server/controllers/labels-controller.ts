import { Request, Response, NextFunction } from 'express';
import { LabelUseCase } from '../modules/labels/labelsUseCase'

export class LabelController {
  private useCase: LabelUseCase

  constructor (labelUseCase: LabelUseCase) {
    this.useCase = labelUseCase
  }

  createLabel = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const { name, description, departmentId } = req.body;
        const response = await this.useCase.createLabel({ name, description, departmentId })
        return res.status(200).json(response)
    } catch (error) {
        next(error);
    }
  }

  getLabelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const response = await this.useCase.getLabelById({ id });
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
    };


    updateLabel = async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);
        const { name, description, departmentId } = req.body;
        try {
            const response = await this.useCase.updateLabel({ id, name, description, departmentId })
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

    deletedLabel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const response = await this.useCase.deleteLabel({ id })
            return res.status(200).json(response)
        } catch (error) {
            next(error);
        }
    }

  listLabels = async (req: Request, res: Response) => {
    const response = await this.useCase.listLabels({})
    return res.status(200).json(response)
  }
}
