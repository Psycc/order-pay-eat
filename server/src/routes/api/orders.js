import express from 'express';
const router = express.Router();

import isLoggedIn from '../../middleware/isLoggedIn';

router.get('/orders', (req, res) => {

});
router.get('/orders/:id', (req, res) => {

});

// auth required
router.use(isLoggedIn);
router.post('/orders', (req, res) => {

});
router.patch('/orders/:id', (req, res) => {

});
router.delete('/orders/:id', (req, res) => {

});

module.exports = router;