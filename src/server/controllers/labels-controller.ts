import { Request, Response } from 'express';
import { LabelUseCase } from '../modules/labels/labelsUseCase'

export class LabelController {
  private useCase: LabelUseCase

  constructor (labelUseCase: LabelUseCase) {
    this.useCase = labelUseCase
  }

  createLabel = async(req: Request, res: Response) =>{
    const { name, description, departmentId } = req.body;
    const response = await this.useCase.createLabel({ name, description, departmentId })
    return res.status(200).json(response)
  }

  getLabelById = async (req: Request, res: Response) => {
    const { id } = req.params
    const response = await this.useCase.getLabelById({ id })
    return res.status(200).json(response)
  }

  updateLabel = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description, departmentId } = req.body;
    const response = await this.useCase.updateLabel({ id, name, description, departmentId })
    return res.status(200).json(response)
  }

  deletedLabel = async (req: Request, res: Response) => {
    const { id } = req.params
    const response = await this.useCase.deleteLabel({ id })
    return res.status(200).json(response)
  }

  listLabels = async (req: Request, res: Response) => {
    const response = await this.useCase.listLabels({})
    return res.status(200).json(response)
  }
}
