import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AppContext from '../../context/AppContext'


function Navbar() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation();

  const { setFilteredData, products, logout, isAuth,cart } = useContext(AppContext)


  // Filter By Category
  const filterByCategory = (category) => {
    setFilteredData(products.filter((data) => data.category?.toLowerCase() === category?.toLowerCase()))

  }

  //Fiter By Price
  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price))

  }

  const submitHandler = (e) => {
    // e.preventDefalut();
    navigate(`/product/search/${searchTerm}`)
    //setSearchTerm("")
  }


  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={'/'} className="left" style={{ textDecoration: 'none', color: 'white' }}>
            <h3>E-Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">
              search
            </span>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              type="text" placeholder='Search Products...' />
          </form>


          <div className="right">
            {isAuth && (
              <>
                <Link to={'/cart'} type="button" className="btn btn-primary position-relative mx-3">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>

                <button className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate('/')
                  }} >
                  Logout</button>
                <Link to={'/profile'} className="btn btn-primary mx-3">Profile</Link>
              </>
            )}


            {!isAuth && (
              <>
                <Link to={'/login'} className="btn btn-secondary mx-3">Login</Link>
                <Link to={'/register'} className="btn btn-info mx-3">Register</Link>
              </>
            )}




          </div>
        </div>


        {location.pathname == '/' && (



          <div className="nav-bar-wrapper">
            <div
              className="items">Filter by {"->"}</div>
            <div onClick={() => setFilteredData(products)}
              className="items">No Filter</div>
            <div onClick={() => filterByCategory("Mobile")}
              className="items">Mobiles</div>
            <div onClick={() => filterByCategory("laptops")}
              className="items">Laptops</div>
            <div onClick={() => filterByCategory("tablets")}
              className="items">Tablets</div>
            <div onClick={() => filterByPrice("29999")}
              className="items"> {">="}29999 </div>
            <div onClick={() => filterByPrice("49999")}
              className="items"> {">="}49999 </div>
            <div onClick={() => filterByPrice("69999")}
              className="items"> {">="}69999 </div>
            <div onClick={() => filterByPrice("89999")}
              className="items"> {">="}89999 </div>

          </div>

        )}
      </div>
    </>
  )
}

export default Navbar