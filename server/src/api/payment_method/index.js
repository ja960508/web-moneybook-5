import express from 'express';
import * as ctrl from './payment_method.ctrl.js';

const router = express.Router();

router.get('/', ctrl.getPaymentMethods);
router.post('/', ctrl.addPaymentMethod);
router.delete('/:id', ctrl.removePaymentMethod);

export default router;
