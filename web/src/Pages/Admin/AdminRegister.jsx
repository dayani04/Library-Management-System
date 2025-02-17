import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminRegiste.css";

function AdminRegister() {
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
      await axios.post("http://localhost:5000/admins", userData);

      Swal.fire({
        title: "Success!",
        text: "Admin added successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });

      setUserData({ name: "", email: "", age: "", address: "", password: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error adding admin!",
        icon: "error",
        confirmButtonText: "Try Again",
      });

      console.error("Error adding admin:", error);
    }
  };

  return (
    <section>
      <div className="add-admin-container">
        <h2>Register New Admin</h2>
        <form onSubmit={handleSubmit} className="add-admin-form">
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
          <button type="submit" className="submit-btn">Register Admin</button>
        </form>
      </div>
    </section>
  );
}

export default AdminRegister;
