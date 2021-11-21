import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		default: 0,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
}, {
	collection: 'products',
});

const product = mongoose.model('productSchema', productSchema);

module.exports = product;