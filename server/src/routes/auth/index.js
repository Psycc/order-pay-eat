import express from 'express';
const router = express.Router();

import isLoggedIn from '../../middleware/isLoggedIn';

import register from './register';
import login from './login';
import logout from './logout';
import refresh from './refresh';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isLoggedIn, logout);

router.post('/refresh', refresh);

module.exports = router;
