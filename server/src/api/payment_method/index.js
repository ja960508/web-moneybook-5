import express from 'express';
import * as ctrl from './payment_method.ctrl.js';

const router = express.Router();

router.get('/', ctrl.getPaymentMethods);

export default router;
