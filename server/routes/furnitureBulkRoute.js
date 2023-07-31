import express from 'express';
import { furnitureBulkInsert, furnitureBulkUpdate, furnitureBulkDelete } from '../controllers/bulkFunituresActions.js';

const router = express.Router(); // to create routes path in the backend

router.post('/', furnitureBulkInsert);
router.put('/', furnitureBulkUpdate);
router.delete('/', furnitureBulkDelete);

export default router;