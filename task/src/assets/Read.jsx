import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react' 
import { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function Read() {
  const [data, setData] = useState([])
  const {id} = useParams();
  

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
   }, [])
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <div className='w-75 bg-white p-5 rounded shadow'>
        <h3>Details of the task</h3>
       
        <div className='mb-2'>
          <strong>TITLE: {data.title}</strong>
        </div>
        <div className='mb-2'>
          <strong>DESCRIPTION: {data.description}</strong>
        </div>
        <div className='mb-2'>
          <strong>CATAGORY: {data.catagory}</strong>
        </div>
        <div className='mb-2'>
          <strong>STATUS: {data.status}</strong>
        </div>
        <div className='mb-2'>
          <strong>ASSIGNEE: {data.assignee}</strong>
         </div>
  
         <Link to="/" className='btn btn-primary ms-3'>Back</Link>
      </div>

    </div>
  )
}

export default Read