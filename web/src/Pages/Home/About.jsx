import React from "react";

export default function About() {
  const about = [
    {
      icon: <i className="fa fa-book fa-2x mb-2" style={{ color: "#ac6d06" }}></i>,
      text: "Books Available",
      count: "12,478",
    },
    {
      icon: <i className="fa fa-users fa-2x mb-2" style={{ color: "#ac6d06" }}></i>,
      text: "Active Members",
      count: "3,214",
    },
    {
      icon: <i className="fa fa-graduation-cap fa-2x mb-2" style={{ color: "#ac6d06" }}></i>,
      text: "Research Papers",
      count: "1,025",
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h6 className="section-title text-start" style={{ color: "#ac6d06" }}>
              About Our Library
            </h6>
            <h1 className="mb-4">
              Welcome to{" "}
              <span className="text-uppercase" style={{ color: "#ac6d06" }}>
                Knowledge Hub
              </span>
            </h1>
            <p className="mb-4">
              At Knowledge Hub, we offer a vast collection of books, research papers, and digital resources. Our mission is to empower readers and learners with access to knowledge, in a quiet and inspiring environment.
            </p>
            <div className="row g-3 pb-4">
              {about.map((item, key) => (
                <div key={key} className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4 about-box">
                      {item.icon}
                      <h2 className="mb-1" style={{ color: "#e6ae59" }}>
                        {item.count}
                      </h2>
                      <p className="mb-0">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="/assets/img/about4.jpg"
                  style={{ marginTop: "25%" }}
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="/assets/img/about5.jpg"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-50 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="/assets/img/about3.jpg"
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="/assets/img/about1.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
