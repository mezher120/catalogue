import express from 'express';

import { getAllFurnitures, createFurniture, getOneFurniture, deleteOneFurniture, updateOneFurniture } from '../controllers/furnituresActions.js'

const router = express.Router(); // to create routes path in the backend

router.get('/', getAllFurnitures);
router.post('/', createFurniture);
router.get('/getone', getOneFurniture);
router.delete('/delete', deleteOneFurniture);
router.put('/update', updateOneFurniture);

export default router;