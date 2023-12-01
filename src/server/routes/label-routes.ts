import express from 'express';
import { LabelUseCase } from '../modules/labels/labelsUseCase';
import { LabelController } from '../controllers/labels-controller';

const router = express.Router()
const labelUseCase = new LabelUseCase()
const labelController = new LabelController(labelUseCase)

router.post('/labels/new', labelController.createLabel);
router.get('/labels/:id', labelController.getLabelById);
router.put('/labels/:id', labelController.updateLabel);
router.delete('/labels/:id', labelController.deletedLabel);
router.get('/labels', labelController.listLabels);

export default router;
