import express from 'express';
const router = express.Router();

import isLoggedIn from '../../middleware/isLoggedIn';

router.get('/company_data', (req, res) => {

});
router.get('/company_data/:id', (req, res) => {

});

// auth required
router.use(isLoggedIn);
router.post('/company_data', (req, res) => {

});
router.patch('/company_data/:id', (req, res) => {

});

module.exports = router;