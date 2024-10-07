import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import prodctRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import cors from 'cors'

const app = express();

app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// home
app.get('/',(req,res)=>
res.send({message:'This Is Home Route'}))


//user Router
app.use('/api/user',userRouter)

//Product Router
app.use('/api/product',prodctRouter)

//cart Router
app.use('/api/cart',cartRouter)


//address router
app.use('/api/address',addressRouter)

mongoose.connect("mongodb+srv://chintumaurya7069:hSfgoQommLoAEvC6@cluster0.w0fpf.mongodb.net/",{
    dbName:"MERN_E_Commerce"
}).then(()=>console.log("MongoDB Connected Sucessfully...!")).catch((err)=>console.log(err));

const port = 3000;

app.listen(port,()=>console.log(`Server is Running on ${port}`));
