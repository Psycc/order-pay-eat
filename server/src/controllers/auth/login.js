import {
	createAccessToken,
	createRefreshToken,
} from '../../services/createTokens';
import bcrypt from 'bcryptjs';
import User from '../../models/user';


module.exports = async (req, res) => {
	// Find User
	const { username, password } = req.body;
	const user = await User.findOne({ username }).lean();

	if (!user) {
		return res.status(401).json({
			message: 'USER_NOT_EXISTS',
		});
	}
	const { _id, token_version } = user;

	// Validate password
	try {
		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) {
			return res.status(401).json({
				message: 'INVALID_PASSWORD',
			});
		}

		// send tokens
		res.cookie(
			'jid',
			createRefreshToken({
				_id,
				token_version,
			}),
			{
				httpOnly: true,
				path: req.baseUrl,
			}
		);
		return res.status(200).json({
			access_token: createAccessToken({
				_id,
			}),
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}