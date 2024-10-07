import React, { useContext } from 'react'
import AppContext from './context/AppContext'
import ShowProduct from './components/product/ShowProduct'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetail from './components/product/ProductDetail'
import Navbar from './components/user/Navbar'
import SearchProduct from './components/product/SearchProduct'
import Register from './components/user/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/user/Login'
import Cart from './components/user/Cart'
import Profile from './components/user/Profile'
import Address from './components/user/Address'
import Checkout from './components/user/Checkout'
import OrderConfirmation from './components/user/OrderConfirmation'

const App = () => {
  //const{}=useContext(AppContext)
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product/search/:term' element={<SearchProduct />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/shipping' element={<Address />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orderconfirmation' element={<OrderConfirmation />} />
        

      </Routes>
    </Router>
  )
}

export default App