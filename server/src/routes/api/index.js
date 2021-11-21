import express from 'express';
const router = express.Router();

import products from './products';
import orders from './orders';
import company_data from './company_data';
import options from './options';

router.use(products);
router.use(orders);
router.use(company_data);
router.use(options);

module.exports = router;
