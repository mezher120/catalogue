import express from 'express';
import { furnitureBulkInsert, furnitureBulkUpdate, furnitureBulkDelete, furnitureBulkUpdateAndUpload } from '../controllers/bulkFunituresActions.js';

const router = express.Router(); // to create routes path in the backend

router.post('/', furnitureBulkInsert);
router.put('/', furnitureBulkUpdate);
router.put('/updateupload/', furnitureBulkUpdateAndUpload);
router.delete('/', furnitureBulkDelete);

export default router;