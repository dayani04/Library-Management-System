import React from "react";
import "./Services.css"; // Import CSS for styling
import "@fortawesome/fontawesome-free/css/all.min.css"; 

export default function Services() {
  const services = [
    {
      id: 1,
      icon: <i className="fa fa-book-open fa-2x custom-icon"></i>,
      name: "Book Borrowing & Returns",
      description:
        "Easily borrow and return books with our seamless library management system.",
    },
    {
      id: 2,
      icon: <i className="fa fa-tablet-alt fa-2x custom-icon"></i>,
      name: "Digital Library Access",
      description:
        "Access thousands of e-books and journals anytime, anywhere.",
    },
    {
      id: 3,
      icon: <i className="fa fa-search fa-2x custom-icon"></i>,
      name: "Research & Reference Services",
      description:
        "Find the right books and research materials with expert assistance.",
    },
    {
      id: 4,
      icon: <i className="fa fa-chair fa-2x custom-icon"></i>,
      name: "Reading Spaces & Facilities",
      description:
        "Comfortable and quiet reading spaces for focused study sessions.",
    },
    {
      id: 5,
      icon: <i className="fa fa-id-card fa-2x custom-icon"></i>,
      name: "Membership & Accounts",
      description:
        "Sign up for library membership to enjoy exclusive benefits and services.",
    },
    {
      id: 6,
      icon: <i className="fa fa-calendar-alt fa-2x custom-icon"></i>,
      name: "Events & Workshops",
      description:
        "Join book clubs, author events, and workshops to expand your knowledge.",
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
      <h6 className="section-title text-start" style={{ color: "#ac6d06" }}>
              Services Our Library
            </h6>
            <h1 className="mb-4">
              Welcome to{" "}
              <span className="text-uppercase" style={{ color: "#ac6d06" }}>
                our digital library
              </span>
            </h1>
        <div className="row g-4">
          {services.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <a className="service-item card-hover-effect rounded" href="#" tabIndex="0">
                <div className="service-icon d-flex justify-content-center align-items-center mb-3">
                  {item.icon}
                </div>
                <h5 className="service-name mb-3 text-center">{item.name}</h5>
                <p className="text-body mb-0 text-center">{item.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
