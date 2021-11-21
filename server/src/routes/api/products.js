import express from 'express';
const router = express.Router();

import isLoggedIn from '../../middleware/isLoggedIn';
import Product from '../../models/product';

router.get('/products', async (req, res) => {
	try {
		const products = await Product.find().lean();
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.get('/products/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const product = await Product.findOne({ _id }).lean();
		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

// auth required
router.use(isLoggedIn);

router.post('/products', async (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
	});
	try {
		const newProduct = await product.save();
		return res.status(200).json(newProduct);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

});

router.patch('/products/:id', async(req, res) => {
	const _id = req.params.id;
	const product = await Product.findOne({ _id });

	console.log(req.body);
	product.name = req.body.name;
	product.price = req.body.price;
	product.description = req.body.description;

	try {
		const newProduct = await product.save();
		return res.status(200).json(newProduct);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.delete('/products/:id', async(req, res) => {
	const _id = req.params.id;
	try {
		await Product.deleteOne({ _id });
		return res.status(204).json();
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;