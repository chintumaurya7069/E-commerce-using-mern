import express from 'express'
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from '../Controllers/product.js';

const router = express.Router();

//add Product
router.post('/add',addProduct)

//Get Product
router.get('/all',getProduct)

//Get Product By Id
router.get('/:id',getProductById)

//Update Product by id
router.put('/:id',updateProductById)

//delete product by id
router.delete('/:id',deleteProductById)

export default router