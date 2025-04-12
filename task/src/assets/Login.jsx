import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check if the user exists in the fetched users list
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert('Login successful!');
        
        localStorage.setItem('token', 'dummy-token'); // Save a dummy token for authentication
        navigate('/'); // Redirect to home or dashboard
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <p>You agree to our terms and policies</p>
          <Link to="/signup" className="btn btn-default border w-100 bg-light">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;