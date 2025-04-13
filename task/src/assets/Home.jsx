import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("authToken")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter
  const [categoryOptions, setCategoryOptions] = useState([
    "All",
    "Develop",
    "Testing",
    "Release",
    "Deployment",
  ]); // Example category options
  const [statusOptions, setStatusOptions] = useState([
    "All",
    "Completed",
    "Pending",
    "Todo",
    "Inprogress",
  ]); // Example status options

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/tasks/${id}`)
        .then(() => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); // Remove the token from session storage
    navigate("/login", { replace: true }); // Redirect to login page
  };

  // Filter data based on search query, category filter, and status filter
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.catagory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignee.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "All" ||
      item.catagory.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus =
      statusFilter == "" ||
      statusFilter === "All" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Task</h1>
      <div className="w-75 bg-white p-5 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          {/* Search Input */}
          <div className="w-50 d-flex flex-column gap-2">
            <label htmlFor="search" className="form-label">
              Search
            </label>
            <input
              className="form-control w-75"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="w-50 d-flex flex-column gap-2">
            <label htmlFor="categoryFilter" className="form-label">
              Category Filter
            </label>
            <select
              className="form-select w-75"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)} // Update category filter
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Dropdown */}
          <div className="w-50 d-flex flex-column gap-2">
            <label htmlFor="statusFilter" className="form-label">
              Status Filter
            </label>
            <select
              className="form-select w-75"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} // Update status filter
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="btn btn-primary w-50 mt-4 d-flex justify-content-center align-items-center gap-2">

            <Link to="/create" className=" text-decoration-none text-white">
              Create A Task
            </Link>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>CATAGORY</th>
              <th>STATUS</th>
              <th>ASSIGNEE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.catagory}</td>
                <td>{item.status}</td>
                <td>{item.assignee}</td>
                <td>
                  <Link
                    to={`/update/${item.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <button onClick={handleLogout} className="d-flex align-items-end">
            Logout
          </button>
        </table>
      </div>
    </div>
  );
}

export default Home;
