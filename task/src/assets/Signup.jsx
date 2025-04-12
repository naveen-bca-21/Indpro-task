import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        navigate('/login'); // Redirect to login page
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleSignup}>
          <h2>Signup</h2>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name" // Added autocomplete attribute
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" // Added autocomplete attribute
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" // Added autocomplete attribute
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Signup
          </button>
          <p>You agree to our terms and policies</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;