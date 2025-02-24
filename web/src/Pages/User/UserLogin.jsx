import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.css";

function UserLogin() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login", 
        loginData,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", loginData.email);

        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/UserBookDetails");  // Redirect to profile page
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
            navigate("/UserRegister");
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
          navigate("/UserRegister");
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="UL-login-container">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <p className="register-link">
            Don't have an account? <Link to="/UserRegister">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
