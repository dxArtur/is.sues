import express from 'express';
import { labelController } from '../controllers/labels-controller';

const router = express.Router();

router.post('/labels/new', labelController.createLabel);
router.get('/labels/:id', labelController.getLabel);
router.put('/labels/:id', labelController.updateLabel);
router.delete('/labels/:id', labelController.deleteLabel);
router.get('/labels/all', labelController.listLabels);

export default router;
