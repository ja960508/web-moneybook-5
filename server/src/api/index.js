import express from 'express';
import historyRouter from './history/index.js';
import paymentMethodRouter from './payment_method/index.js';

const router = express.Router();

router.use('/history', historyRouter);
router.use('/paymentMethod', paymentMethodRouter);

export default router;
