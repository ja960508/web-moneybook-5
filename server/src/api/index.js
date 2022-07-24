import express from 'express';
import historyRouter from './history/index.js';
import paymentMethodRouter from './payment_method/index.js';
import categoryRouter from './category/index.js';

const router = express.Router();

router.use('/history', historyRouter);
router.use('/paymentMethod', paymentMethodRouter);
router.use('/category', categoryRouter);

export default router;
