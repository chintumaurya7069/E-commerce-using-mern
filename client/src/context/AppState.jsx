import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appstate = (props) => {

    const url = "http://localhost:3000/api"

    const [products, setproducts] = useState([])

    const [token, setToken] = useState([])
    const [isAuth, setIsAuth] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [user, setUser] = useState()
    const [cart, setCart] = useState([])
    const [reload, setReload] = useState(false)
    const [userAddress, setUserAddress] = useState("");
    const [userOrder, setUserOrder] = useState([]);



    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            // console.log(api.data.products);
            setproducts(api.data.products)
            setFilteredData(api.data.products)
            userProfile();
        };
        fetchProduct();
        userCart();
        getAddress();
        user_Order();
    }, [token,reload])


    useEffect(() => {
        let lstoken = localStorage.getItem("token");
    // console.log("ls token ",lstoken)
    if (lstoken) {
      setToken(lstoken);
      setIsAuth(true);
    }
     // setToken(localStorage.getItem('token'))
    }, [])
    

    //register user
    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`,
            { name, email, password }, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        })

        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        // alert(api.data.message)
        return api.data
        // console.log("User Register",api);

    };

    //User Login
    const login = async (email, password) => {
        const api = await axios.post(`${url}/user/login`,
            { email, password }, {
            headers: {
                "Content-Type": "Application/json"
            },
            withCredentials: true
        })

        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        // console.log(api.data);
        setToken(api.data.token);
        setIsAuth(true);
        localStorage.setItem('token', api.data.token)
        // alert(api.data.message)
        return api.data
        // console.log("User Register",api);

    };

    //Logout User 
    const logout = () => {
        setIsAuth(false)
        setToken(" ")
        localStorage.removeItem('token')
        toast.success("Logout Sucessfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    //user Profile
    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "Application/json",
                "Auth": token
            },
            withCredentials: true
        })
        // console.log(api.data);
        setUser(api.data.user)
    }

    //Add to cart
    const addToCart = async (productId, title, price, qty, imageSrc) => {
        const api = await axios.post(`${url}/cart/add`,{productId, title, price, qty, imageSrc}, {
            headers: {
                "Content-Type": "Application/json",
                Auth:token
            },
            withCredentials: true
        })
        setReload(!reload)
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
       //console.log(api,"my Cart");
       
    };

//Get User Cart
const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
        headers: {
            "Content-Type": "Application/json",
            Auth:token
        },
        withCredentials: true
    })
    setCart(api.data.cart)
    //setUser("user cart",api)
   //console.log(api,"my Cart");
   
};

//-- qty
const decreaseQty = async (productId, qty) => {
    const api = await axios.post(`${url}/cart/--qty`,{productId, qty}, {
        headers: {
            "Content-Type": "Application/json",
            Auth:token
        },
        withCredentials: true
    });
    setReload(!reload)
    toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
   // setCart(api.data.cart)

   
};

// Remove Item From cart
const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`,
         {
        headers: {
            "Content-Type": "Application/json",
            Auth:token
        },
        withCredentials: true
    });
    setReload(!reload)
    toast.success("Remove Item From Cart",{
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
   // setCart(api.data.cart)

   
};


// Clear cart
const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`,
    {
        headers: {
            "Content-Type": "Application/json",
            Auth:token
        },
        withCredentials: true
    });
    setReload(!reload)
    toast.success("Sucessfully Clear Cart",{
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
   // setCart(api.data.cart)

   
};


//Add Shipping Address
const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log("remove item from cart ",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return api.data;
    //  setCart(api.data.cart);
    //  setUser("user cart ",api);
  };



// get User latest address
const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user address ", api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };


 // get User order
 const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user order ", api.data);
    setUserOrder(api.data)
    
  };
console.log("user order = ", userOrder);


    return (
        <AppContext.Provider value={{
            products, register, login, url,
            token, setIsAuth, isAuth, filteredData,
            setFilteredData, logout,user,addToCart,cart
            ,decreaseQty,removeFromCart,clearCart,shippingAddress,
            userAddress,
            userOrder,
        }}>
            {props.children}</AppContext.Provider>
    )
}

export default Appstate; 