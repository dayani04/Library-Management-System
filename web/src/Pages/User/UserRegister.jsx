import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./UserRegister.css"; // Update the CSS file name if necessary

function UserRegister() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", userData);

      Swal.fire({
        title: "Success!",
        text: "User registered successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });

      setUserData({ name: "", email: "", age: "", address: "", password: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error registering user!",
        icon: "error",
        confirmButtonText: "Try Again",
      });

      console.error("Error registering user:", error);
    }
  };

  return (
    <section>
      <div className="user-container">
        <div className="add-user-container">
          <h2>Register New User</h2>
          <form onSubmit={handleSubmit} className="add-user-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" value={userData.age} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={userData.address} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={userData.password} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="submit-btn">Register User</button>
            <p className="login-link">
              Already have an account? <Link to="/UserLogin">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserRegister;
