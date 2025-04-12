import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Create() {
  const navigate = useNavigate(); 
    useEffect(() => {
      if (!sessionStorage.getItem("authToken")) {
        navigate("/login", { replace: true }); 
      }
    }, [navigate]);

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

  const [values, setValues] = React.useState({
    id: uuidv4(), // Generate a new GUID
    title: "",
    description: "",
    catagory: "Develop",
    status: "Todo",
    assignee: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/tasks", values).then((res) => {
      console.log(res.data);
      alert("Task Added Successfully");
      navigate("/");
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <div className="w-75 bg-white p-5 rounded shadow px-5 pt-3 rounded">
        <h1 className="d-flex justify-content-center alian-items-center">
          Add A Task
        </h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-2">
            <label htmlFor="title">TITLE:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
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
              onChange={(e) =>
                setValues({ ...values, assignee: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success ms-3">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
