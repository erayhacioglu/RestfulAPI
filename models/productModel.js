import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		img: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
			maxlength: 100,
		},
	},
	{ timestamps: true }
);

const product = mongoose.model('product', productSchema);

export default product;
