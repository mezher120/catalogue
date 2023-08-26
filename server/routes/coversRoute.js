import express from 'express';
import { getCovers, postCovers} from '../controllers/coversActions.js'

const router = express.Router();

router.get('/', getCovers);
router.post('/', postCovers);

export default router;