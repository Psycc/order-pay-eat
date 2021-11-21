import { verify } from 'jsonwebtoken';



module.exports = (req, res, next) => {
	// check for auth token
	const auth = req.headers.authorization;
	if (!auth) return res.sendStatus(401).json({ message: 'Authentication required' });
	const acToken = auth.split(' ')[1];

	// Validate access token
	verify(acToken, process.env.ACCESS_TOKEN, (err) => {
		if (!err) {
			return next();
		} else {
			return res.status(401).json({ message: err.message });
		}
	});
};
