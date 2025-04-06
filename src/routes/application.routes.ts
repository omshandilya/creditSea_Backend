import express from 'express';
import {
  submitApplication,
  listApplications,
  verifyApplication,
  approveApplication,
} from '../controllers/application.controller';

const router = express.Router();

router.post('/', submitApplication);
router.get('/', listApplications);
router.put('/:id/verify', verifyApplication);
router.put('/:id/approve', approveApplication);

export default router;
