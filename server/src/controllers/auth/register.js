import bcrypt from 'bcryptjs';
import User from '../../models/user';

module.exports = async (req, res) => {
	const { username, password, first_name, last_name } = req.body;
	//Validate data
	if (!username || !password || !first_name || !last_name) {
		return res
			.status(400)
			.json({ message: 'Missing username or password' });
	}

	// Hash Password
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		req.body.password = hash;
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	// Create User
	const user = new User(req.body);

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}