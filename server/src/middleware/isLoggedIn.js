import { createAccessToken } from '../services/createTokens';
import { verify } from 'jsonwebtoken';
import User from '../models/user';



module.exports = (req, res, next) => {
	// check for auth token
	const auth = req.headers.authorization;
	if (!auth) return res.sendStatus(401).json({ message: 'Authentication required' });
	const acToken = auth.split(' ')[1];

	// Validate access token
	verify(acToken, process.env.ACCESS_TOKEN, (err) => {
		if (!err) {
			return next();
		} else if (err.message === 'invalid token') {
			validateNewAccessToken(req, res, next);
		} else {
			return res.status(401).json({ message: err.message });
		}
	});
};

const validateNewAccessToken = (req, res, next) => {
	// Validate refresh token
	const token = req.cookies.jid;
	verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
		const _id = decoded._id;
		const user = async () => await User.findOne({ _id }).lean();

		if (!err || decoded.token_version !== user.token_version) {
			// if not logout page, append new access token
			if (!req.route.path.includes('/logout')) {
				res.access_token = createAccessToken({
					_id: decoded._id,
				});
			}
			next();
		} else {
			//log user out
			res.cookie('jid', '', {
				httpOnly: true,
				path: req.baseUrl,
			});
			return res.status(401).json({ message: 'Invalid Refresh-Token' });
		}
	});
}
