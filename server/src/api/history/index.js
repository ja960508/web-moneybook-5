import express from 'express';
import * as ctrl from './history.ctrl.js';
import { isValidHistory } from './middleware/history_middleware.js';

const router = express.Router();

router.get('/', ctrl.getHistoryList);
router.post('/', isValidHistory, ctrl.addHistory);
router.delete('/:id', ctrl.removeHistory);
router.patch('/:id', ctrl.updateHistory);

router.get('/recentHistory', ctrl.getRecentHistory);

export default router;
