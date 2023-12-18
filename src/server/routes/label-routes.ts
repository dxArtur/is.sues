import express from 'express';
import { LabelUseCase } from '../modules/labels/labelsUseCase';
import { LabelController } from '../controllers/labels-controller';
import { verifyTokenAuthentication, verifyAdminAuth } from "../middlewares/verifyTokenAuthenticantion"

const router = express.Router()
const labelUseCase = new LabelUseCase()
const labelController = new LabelController(labelUseCase)

router.post('/labels', verifyTokenAuthentication, verifyAdminAuth, labelController.createLabel);
router.get('/labels/:id', labelController.getLabelById);
router.put('/labels/:id', verifyTokenAuthentication, verifyAdminAuth, labelController.updateLabel);
router.delete('/labels/:id', verifyTokenAuthentication, verifyAdminAuth, labelController.deletedLabel);
router.get('/labels', labelController.listLabels);

export default router;
