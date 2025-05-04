import { Router } from 'express';
import reportController from '../controllers/report.controller';

const router = Router();

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);
router.get('/repeated-words', reportController.getReportsWithRepeatedWords);

export default router;
