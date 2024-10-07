import React, { useContext } from 'react'
import { useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register } = useContext(AppContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const { name, email, password } = formData
  const submitHandler = async (e) => {
    e.preventDefault();
    //alert("Your form has been submitted ")
    const result = await register(name, email, password)

    //console.log(result);
    

    if (result.sucess) {
      navigate('/login')
      //console.log(formData);
    }
    // 

  }

  return (
    <>
      <div className="container my-5" style={{ width: '40%', padding: '25px', border: '2px solid yellow', borderRadius: '10px' }}>
        <h1 style={{ textAlign: 'center' }}>User Register</h1>
        <form onSubmit={submitHandler} className='my-3'>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className='text-center'>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register