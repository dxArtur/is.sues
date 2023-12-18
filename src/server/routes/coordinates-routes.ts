import express from 'express';
import { Router } from 'express';
import { salvarCoordenadas, listarCoordenadas, deletarCoordenada } from '../controllers/coordinates-controller';

const router: Router = express.Router();

router.post('/store-coordinates', salvarCoordenadas);
router.get('/list-coordinates', listarCoordenadas);
router.delete('/delete-coordinate/:id', deletarCoordenada); 

export default router;
