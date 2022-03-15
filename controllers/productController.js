import Products from '../models/productModel.js';
import APIfeatures from '../utils/APIfeatures.js';

//@desc   Fetch All Products
//@route  Get -> api/product
//@access Public
const allProducts = async (req, res) => {
	try {
		const features = new APIfeatures(Products.find(), req.query)
			.filtering()
			.sorting()
			.paginating()
			.searching();
		const products = await features.query;
		if (products.length === 0)
			return res.status(400).json({ msg: 'No Products' });
		return res.status(200).json({ count: products.length, products });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

//@desc   Fetch A Product
//@route  Get -> api/product/:id
//@access Public
const singleProduct = async (req, res) => {
	try {
		const product = await Products.findById(req.params.id);
		if (product === null) return res.status(400).json({ msg: 'No Product' });
		return res.status(200).json({ product });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

//@desc   Create A Product
//@route  Post -> api/product
//@access Public
const createProduct = async (req, res) => {
	try {
		const { img, title, category, price, description } = req.body;

		if (!img || !title || !category || !price || !description)
			return res.status(400).json({ msg: 'Please fill in all fields' });

		const exist = await Products.findOne({ title });
		if (exist)
			return res
				.status(400)
				.json({ msg: 'This product is already registered' });

		if (description.length >= 100)
			return res
				.status(400)
				.json({ msg: 'Product description can be up to 100 characters' });

		const newProduct = new Products({
			img,
			title,
			category,
			price,
			description,
		});

		await newProduct.save();

		return res.status(201).json({ mag: 'New product is created' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

//@desc   Update A Product
//@route  Patch -> api/product/:id
//@access Public
const updateProduct = async (req, res) => {
	try {
		const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!product)
			return res.status(404).json({ msg: 'This product does not exist.' });
		return res.status(200).json({ product });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

//@desc   Delete A Product
//@route  Delete -> api/product/:id
//@access Public
const deleteProduct = async (req, res) => {
	try {
		const product = await Products.findByIdAndDelete(req.params.id);
		if (!product)
			return res.status(404).json({ msg: 'This product does not exist.' });
		return res.status(200).json({ msg: 'Product is deleted' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error' });
	}
};

export {
	allProducts,
	singleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
