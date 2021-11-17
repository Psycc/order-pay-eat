import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	token_version: {
		type: Number,
		default: 0,
		required: true,
	},
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
}, {
	collection: 'users',
});

const user = mongoose.model('userSchema', userSchema);

module.exports = user;