import express from 'express';
const router = express.Router();

import test from '../controllers/api/test';

router.post('/test', test);


module.exports = router;
