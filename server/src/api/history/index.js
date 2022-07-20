import express from 'express';
import * as ctrl from './history.ctrl.js';
import { isValidHistory } from './middleware/historyMiddleware.js';

const router = express.Router();

router.get('/', ctrl.getHistoryList);
router.post('/', isValidHistory, ctrl.addHistory);
router.delete('/:id', ctrl.removeHistory);
router.patch('/:id', ctrl.updateHistory);

export default router;
