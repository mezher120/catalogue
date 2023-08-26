import express from 'express';
import { postColor, getColor } from '../controllers/colorsActions.js'

const router = express.Router();

router.get('/', getColor);
router.post('/', postColor);

export default router;