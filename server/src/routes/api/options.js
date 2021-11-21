import express from 'express';
const router = express.Router();

import isLoggedIn from '../../middleware/isLoggedIn';

router.get('/options', (req, res) => {

});
router.get('/options/:id', (req, res) => {

});

// auth required
router.use(isLoggedIn);
router.post('/options', (req, res) => {

});
router.patch('/options/:id', (req, res) => {

});

module.exports = router;