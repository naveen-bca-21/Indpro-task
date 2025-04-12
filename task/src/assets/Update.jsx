import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Update() {
  const categoriesData = [
    { label: "1 ", value: "Develop" },
    { label: "2 ", value: "Test" },
    { label: "3 ", value: "Deployment" },
    { label: "4 ", value: "Release" },
  ];

  const statusData = [
    { label: "1 ", value: "Todo" },
    { label: "2 ", value: "Pending" },
    { label: "3 ", value: "Inprogress" },
    { label: "4 ", value: "Completed" },
  ];

  const { id } = useParams();

  const [values, setValues] = React.useState({
    id: "",
    title: "",
    description: "",
    catagory: "",
    status: "",
    assignee: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/tasks/${id}`)
      .then((res) => {
        console.log(res.data);
       setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3000/tasks/${id}`, values)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <div className="w-75 bg-white p-5 rounded shadow px-5 pt-3 rounded">
        <h1 className="d-flex justify-content-center alian-items-center">
          Update A Task
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="title">TITLE:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Description">DESCRIPTION:</label>
            <input
              type="text"
              name="id"
              className="form-control"
              placeholder="DESCRIPTION"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="catagory">CATAGORY:</label>
            <select
              className="form-select"
              value={values.catagory}
              onChange={(e) =>
                setValues({ ...values, catagory: e.target.value })
              }
            >
              {categoriesData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="status">STATUS:</label>
            <select
              className="form-select"
              value={values.status}
              onChange={(e) => setValues({ ...values, status: e.target.value })}
            >
              {statusData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="assignee">ASSIGNEE:</label>
            <input
              type="text"
              name="assignee"
              className="form-control"
              placeholder="ASSIGNEE"
              value={values.assignee}
              onChange={(e) =>
                setValues({ ...values, assignee: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success ms-3">Update</button>
          <Link to="/" className="btn btn-primary ms-3">
            back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
