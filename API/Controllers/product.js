import { Products } from "../Models/Product.js";

//Add Product
export const addProduct = async (req,res)=>{
    const { title, description, price, category, qty, imageSrc } = req.body;
    try {
        let product = await Products.create({ 
            title, description, price, category, qty, imageSrc
         })
        res.json({message:"Product added sucessfully..!",product})
    } catch (error) {
        res.json(error.message)
    }
}

//Get Products
export const getProduct = async (req,res)=>{
    let products = await Products.find().sort({ createdAt: -1 });
        res.json({message:"All Products",products})
}


//Find Product by id
export const getProductById = async (req,res)=>{
    const id = req.params.id;
    let product = await Products.findById(id);
    if(!product) return res.json({message:"Invalid Id"})
        res.json({message:"Specific Products",product })
}

//Update Product by id
export const updateProductById = async (req,res)=>{
    const id = req.params.id;
    let product = await Products.findByIdAndUpdate(id,req.body,{new:true});
    if(!product) return res.json({message:"Invalid Id"})
        res.json({message:" Product has been updated",product })
}

//Delete Product by id
export const deleteProductById = async (req,res)=>{
    const id = req.params.id;
    let product = await Products.findByIdAndDelete(id,req.body,{new:true});
    if(!product) return res.json({message:"Invalid Id"})
        res.json({message:" Product has been deleted",product })
}