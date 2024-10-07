import express from 'express'
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from '../Controllers/cart.js';
import { Auth } from '../Middlewares/IsAuth.js';

const router = express.Router();

// Add To Cart
router.post('/add',Auth, addToCart)

// Get User Cart
router.get('/user',Auth,userCart)

//Remove Product From Cart
router.delete('/remove/:productId',Auth,removeProductFromCart)

//Clear Cart
router.delete('/clear',Auth,clearCart)

//Decrese item qty
router.post("/--qty",Auth,decreaseProductQty)

export default router;