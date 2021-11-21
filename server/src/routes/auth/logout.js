import { verify } from 'jsonwebtoken';
import User from '../../models/user';

module.exports = async (req, res) => {
	let payload;
	try {
		const token = req.cookies.jid;
		payload = verify(token, process.env.REFRESH_TOKEN);
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}

	try {
		const { _id } = payload;
		const user = await User.findOne({ _id }).lean();

		await User.updateOne(
			{ _id },
			{ $set: { token_version: user.token_version + 1 } }
		);

		res.cookie('jid', '', {
			httpOnly: true,
			path: req.baseUrl,
		});

		return res.sendStatus(204);
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
};
