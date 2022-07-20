import express from 'express';
import historyRouter from './history/index.js';

const router = express.Router();

router.use('/history', historyRouter);

export default router;
