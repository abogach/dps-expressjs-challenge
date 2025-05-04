import { Router } from 'express';
import reportController from '../controllers/report.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, reportController.getAllReports);
router.get('/:id', authenticate, reportController.getReportById);
router.post('/', authenticate, reportController.createReport);
router.put('/:id', authenticate, reportController.updateReport);
router.delete('/:id', authenticate, reportController.deleteReport);
router.get('/repeated-words', authenticate, reportController.getReportsWithRepeatedWords);

export default router;
