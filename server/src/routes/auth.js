import express from 'express';
const router = express.Router();

import isLoggedIn from '../middleware/isLoggedIn';

import register from '../controllers/auth/register';
import login from '../controllers/auth/login';
import logout from '../controllers/auth/logout';
// import resetToken from '../controllers/auth/resetToken';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isLoggedIn, logout);

// router.post('/reset/', resetToken);

module.exports = router;
