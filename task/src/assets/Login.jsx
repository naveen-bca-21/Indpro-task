import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Login = () => {

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      
        <div className='bg-white p-3 rounded w-25'>
        <form action="">
        <h2>Login</h2>
        <div className='mb-3'>
            <label htmlFor="email">Eamil</label>
            <input type="email" placeholder='Enter Email' className='form-control rounded-0'/>
        </div>
        <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter password'className='form-control rounded-0'/>
        </div>
        <button className='btn btn-success w-100' >Login</button>
        <p>You are agree to our terms and policies</p>
        <Link to="/signup" className='btn btn-default border w-100 bg-light'>Create Acoount</Link>
        </form>
      </div>
    </div>
  )
}

export default Login