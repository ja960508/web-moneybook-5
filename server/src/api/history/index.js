import express from 'express';
import * as ctrl from './history.ctrl.js';

const router = express.Router();

router.get('/', ctrl.getHistoryList);

export default router;
