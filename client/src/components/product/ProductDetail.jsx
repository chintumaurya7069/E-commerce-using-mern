import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import axios from 'axios'
import RelatedProduct from './RelatedProduct'

const ProductDetail = () => {
    const { addToCart } = useContext(AppContext)
    const [product, setproduct] = useState([])
    const { id } = useParams();

    const url = "http://localhost:3000/api"


    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/${id}`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            //console.log(api.data.product);
            setproduct(api.data.product)
            //setproducts(api.data.products)
        }
        fetchProduct();
    }, [id])

    return (
        <>
            <div className="container text-center" style={{
                display:'flex',
                justifyContent:'space-evenly',
                alignItems:'center'
            }}>
                <div className="left">
                    <img src={product?.imageSrc} alt="" style={{
                        width: '250px', height: '250px', borderRadius:'10px',border:'2px solid yellow'
                    }} />
                </div>
                <div className="right">
                    <h1>{product?.title}</h1>
                    <p>{product?.description}</p>
                    <h1>{product?.price}{" "}{"₹"}</h1>
                    <div className="my-5">
                        <button className='btn btn-danger mx-3' style={{fontWeight:'bold'}}>Buy Now</button>
                        <button className='btn btn-warning' style={{fontWeight:'bold'}}
                        onClick={()=>addToCart(product._Id, product.title, product.price, 1, product.imageSrc)}
                        >Add To Cart</button>
                    </div>
                </div>
            </div>

            <RelatedProduct category={product?.category} />
        </>
    )
}

export default ProductDetail