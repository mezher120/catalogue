import express from 'express';

import { getAllFurnitures, createFurniture, getOneFurniture } from '../controllers/furnituresActions.js'

const router = express.Router(); // to create routes path in the backend

router.get('/', getAllFurnitures);
router.post('/', createFurniture);
router.get('/getone', getOneFurniture);

export default router;