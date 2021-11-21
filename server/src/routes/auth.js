import express from 'express';
const router = express.Router();

import isLoggedIn from '../middleware/isLoggedIn';

import register from '../controllers/auth/register';
import login from '../controllers/auth/login';
import logout from '../controllers/auth/logout';
import refresh from '../controllers/auth/refresh';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isLoggedIn, logout);

router.post('/refresh', refresh);

module.exports = router;
