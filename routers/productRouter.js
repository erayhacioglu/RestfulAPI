import express from 'express';

import {
	allProducts,
	singleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../controllers/productController.js';
import API_KEY from '../middlewares/API_KEY.js';

const router = express.Router();

router.get('/', API_KEY, allProducts);
router.get('/:id', API_KEY, singleProduct);
router.post('/', API_KEY, createProduct);
router.patch('/:id', API_KEY, updateProduct);
router.delete('/:id', API_KEY, deleteProduct);

export default router;
