import { createAccessToken } from '../../services/createTokens';
import { verify } from 'jsonwebtoken';
import User from '../../models/user';

module.exports = (req, res) => {
	// Validate access_token
	const auth = req.headers.authorization;
	if (!auth) return res.status(401).json({ message: 'access_token required' });
	// Validate refresh token
	const token = req.cookies.jid;
	if (!token) return res.status(401).json({ message: 'refresh_token required' });

	console.log(token);
	verify(token, process.env.REFRESH_TOKEN, async (err, payload) => {
		const _id = payload._id;
		const user = await User.findOne({ _id }).lean();
		console.log(payload.token_version, user.token_version);

		if (!err && payload.token_version === user.token_version) {
			const access_token = createAccessToken({
				_id,
			});

			return res.status(200).json({ access_token });
		} else {
			//log user out
			res.cookie('jid', '', {
				httpOnly: true,
				path: req.baseUrl,
			});
			return res.status(401).json({ message: 'Invalid Refresh-Token' });
		}
	});
};
