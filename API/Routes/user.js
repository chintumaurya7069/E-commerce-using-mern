import express from 'express'
import { login, profile, register, users } from '../Controllers/user.js';
import { Auth } from '../Middlewares/IsAuth.js';

const router = express.Router();

//register user
router.post('/register',register)

//Login user
router.post('/login',login)

//Get All users
router.get('/all',users)

//Get User Profile
router.get('/profile',Auth,profile)

export default router