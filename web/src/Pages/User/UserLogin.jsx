import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./UserLogin.css"; // Update the CSS file name if necessary

function UserLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", loginData);

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          window.location.href = "/UserBookDetails"; // Redirect after successful login
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid credentials! Do you want to register?",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "Register",
          cancelButtonText: "Try Again",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/UserRegister"; // Redirect to UserRegister page
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "User not registered! Do you want to sign up?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Register",
        cancelButtonText: "Try Again",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/UserRegister"; // Redirect to UserRegister page
        }
      });
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="UL-login-container">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" style={{ backgroundColor: "#e6ae59", color: "#fff", border: "none" }}>Login</button>
          <p className="register-link">
            Don't have an account? <Link to="/UserRegister">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
