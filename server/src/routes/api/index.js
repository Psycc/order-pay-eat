import express from 'express';
const router = express.Router();

import products from './products';
import orders from './orders';
import company_data from './company_data';
import options from './options';

router.use('/product', products);
router.use('/order', orders);
router.use('/company_data', company_data);
router.use('/options', options);

module.exports = router;
