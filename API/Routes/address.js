import express from 'express'
import  {addAddress, getAddress}  from '../Controllers/address.js';
import { Auth } from '../Middlewares/IsAuth.js';

const router = express.Router()
//Add Address
router.post('/add',Auth,addAddress)

//Get Address
router.get('/get',Auth,getAddress)

export default router;