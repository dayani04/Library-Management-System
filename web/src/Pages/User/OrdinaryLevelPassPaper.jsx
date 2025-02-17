import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdinaryLevelPassPaper = () => {
  const [passPapers, setPassPapers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ordinary-level-pass")
      .then((response) => setPassPapers(response.data))
      .catch((error) => console.error("Error fetching pass papers:", error));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4" style={{ color: "#89590a", fontWeight: "bold" }}>Ordinary Level Pass Papers</h1>
      <div className="row">
        {passPapers.map((paper) => (
          <div key={paper._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{paper.passYear}</h5>
                <p className="card-text">{paper.description}</p>
                <a 
  href={`http://localhost:5000/${paper.pdfPath}`} 
  className="btn"
  style={{ backgroundColor: "#e6ae59", color: "#fff", border: "none" }}
  target="_blank" 
  rel="noopener noreferrer"
>
  Download PDF
</a>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdinaryLevelPassPaper;
