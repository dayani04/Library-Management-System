import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "./Card.css";

export default function Teams() {
  const team = [
    {
      image: "../assets/img/card1.jpg",
      name: "Grade 5 Scholarship",
      route: "/scholarship-pass",
    },
    {
      image: "../assets/img/card2.jpg",
      name: "Ordinary Level",
      route: "/ordinary-level-pass",
    },
    {
      image: "../assets/img/card3.jpg",
      name: "Advanced Level",
      route: "/advanced-level-pass",
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="mb-4">
          Download{" "}
          <span className="text-uppercase" style={{ color: "#ac6d06" }}>
            Pass Pepper's
          </span>
        </h1>

        <div className="row g-4 justify-content-center">
          {team.map((item, index) => (
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
              key={index}
            >
              <div className="team-card">
                <div className="team-img-container">
                  <img className="team-img" src={item.image} alt={item.name} />
                </div>
                <div className="team-content">
                  <h5 className="team-name">{item.name}</h5>
                  <p className="team-description">
                    Explore our programs designed to help students achieve
                    excellence.
                  </p>
                  {/* Use Link to navigate */}
                  <Link to={item.route} className="learn-more-btn">
                    Pass Paper's
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
