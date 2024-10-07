import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";

//User register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user)
            return res.json({ message: "User Already Register", sucess: false })
        const hashPass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashPass })
        res.json({ message: "User Register Sucessfully...!",user, sucess: true ,hashPass})
    } catch (error) {
        res.json({ message: error.message })
    }
};


//User Login

export const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    
    try {
        let user = await User.findOne({ email });
        if (!user) return res.json({ message: "User Not Found", sucess: false })
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.json({ message: "Invalid credential", sucess: false });
        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
            expiresIn:'365d'
        })
        res.json({ message: `Welcome ${user.name}`,token, sucess: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Get Users
export const users = async (req, res) => {

    try {
        let users = await User.find().sort({ createdAt: -1 });
        res.json(users)
    } catch (error) {
        exports.json(error.message)
    }
}

//Get Profile
export const profile = async (req,res)=>{
    res.json({user:req.user})
}