import express from "express";

import { getAll, postAll } from '../controllers/outstandingActions.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', postAll);

export default router;