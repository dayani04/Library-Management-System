import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        Swal.fire({
          title: "Error!",
          text: "You must be logged in to view your profile.",
          icon: "error",
          confirmButtonText: "Okay",
        });
        setLoading(false);
        return;
      }

      try {
        // Fetch user details
        const response = await axios.get("http://localhost:5000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch profile data. Please try again.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-5 text-gray-600">Loading user profile...</p>;
  }

  if (!userData) {
    return <p className="text-center mt-5 text-red-500">No user data available.</p>;
  }

  return (
    <div className="container mx-auto mt-5 p-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h2>
      <div className="border p-4 rounded-lg bg-gray-50">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Address:</strong> {userData.address}</p>
      </div>
    </div>
  );
};

export default Profile;
