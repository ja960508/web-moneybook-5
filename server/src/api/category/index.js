import express from 'express';
import * as ctrl from './category.ctrl.js';

const router = express.Router();

router.get('/', ctrl.getAllCategory);

export default router;
