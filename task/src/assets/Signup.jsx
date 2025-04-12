import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
            <form action="">
            <h2>Sign up</h2>
            <div className='mb-3'>
                <label htmlFor="text">Name</label>
                <input type="text" placeholder='Enter Name' className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="email">Eamil</label>
                <input type="email" placeholder='Enter Email' className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter password'className='form-control rounded-0'/>
            </div>
            <button className='btn btn-success w-100' >Sign up</button>
            <p>You are agree to our terms and policies</p>
            <Link to="/" className='btn btn-default border w-100 bg-light'>Login</Link>
            </form>
          </div>
        </div>
  )
}

export default Signup