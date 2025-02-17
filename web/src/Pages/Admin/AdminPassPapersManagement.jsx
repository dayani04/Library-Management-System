import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

const PassPapersManagement = () => {
  const [passPapers, setPassPapers] = useState([]);
  const [passPaper, setPassPaper] = useState({
    description: '',
    passYear: '',
    pdfFile: null,
  });
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPassPaperId, setEditPassPaperId] = useState(null);
  const [type, setType] = useState('OL'); // 'OL' or 'AL'
  const [showModal, setShowModal] = useState(false);

  // Fetch pass papers from the backend
  const fetchPassPapers = useCallback(() => {
    const apiUrl =
      type === 'OL'
        ? 'http://localhost:5000/api/ordinary-level-pass'
        : 'http://localhost:5000/api/advanced-level-pass';

    axios
      .get(apiUrl)
      .then((response) => setPassPapers(response.data))
      .catch((error) => console.error('Error fetching pass papers:', error));
  }, [type]);

  useEffect(() => {
    fetchPassPapers();
  }, [fetchPassPapers]);

  // Handle add pass paper form submission
  const handleAddPassPaper = async (e) => {
    e.preventDefault();
    if (!passPaper.pdfFile) {
      Swal.fire('Error', 'Please upload a PDF file.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('description', passPaper.description);
    formData.append('passYear', passPaper.passYear);
    formData.append('pdf', passPaper.pdfFile);

    const apiUrl =
      type === 'OL'
        ? 'http://localhost:5000/api/ordinary-level-pass'
        : 'http://localhost:5000/api/advanced-level-pass';

    try {
      await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchPassPapers();
      resetForm();
      setShowModal(false); // Close the modal
      Swal.fire({
        icon: 'success',
        title: 'Pass Paper Added',
        text: 'The pass paper has been successfully added.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error adding pass paper.',
      });
      console.error(error);
    }
  };

  // Handle update pass paper
  const handleUpdatePassPaper = async (e) => {
    e.preventDefault();
    if (!passPaper.pdfFile) {
      Swal.fire('Error', 'Please upload a PDF file.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('description', passPaper.description);
    formData.append('passYear', passPaper.passYear);
    formData.append('pdf', passPaper.pdfFile);

    const apiUrl =
      type === 'OL'
        ? `http://localhost:5000/api/ordinary-level-pass/${editPassPaperId}`
        : `http://localhost:5000/api/advanced-level-pass/${editPassPaperId}`;

    try {
      await axios.put(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchPassPapers();
      resetForm();
      setShowModal(false); // Close the modal
      Swal.fire({
        icon: 'success',
        title: 'Pass Paper Updated',
        text: 'The pass paper has been updated.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating pass paper.',
      });
      console.error(error);
    }
  };

  // Handle delete pass paper
  const handleDeletePassPaper = (passPaperId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the pass paper!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6453e0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl =
          type === 'OL'
            ? `http://localhost:5000/api/ordinary-level-pass/${passPaperId}`
            : `http://localhost:5000/api/advanced-level-pass/${passPaperId}`;

        axios
          .delete(apiUrl)
          .then(() => {
            setPassPapers(passPapers.filter((paper) => paper._id !== passPaperId));
            Swal.fire({
              icon: 'success',
              title: 'Pass Paper Deleted',
              text: 'The pass paper has been deleted.',
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error deleting pass paper.',
            });
            console.error(error);
          });
      }
    });
  };

  // Handle editing a pass paper
  const handleEditPassPaper = (paper) => {
    setPassPaper({
      description: paper.description,
      passYear: paper.passYear,
      pdfFile: null,
    });
    setIsEditMode(true);
    setEditPassPaperId(paper._id);
    setIsAddMode(false);
    setShowModal(true); // Show the modal when editing
  };

  const resetForm = () => {
    setPassPaper({ description: '', passYear: '', pdfFile: null });
    setIsAddMode(false);
    setIsEditMode(false);
    setEditPassPaperId(null);
  };

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4 font-weight-bold" style={{ color: '#922704' }}>
        {type === 'OL' ? 'Ordinary Level Pass Papers' : 'Advanced Level Pass Papers'}
      </h1>

      <div className="mb-3">
        <button
          className="btn"
          style={{
            backgroundColor: type === 'OL' ? '#c5860a' : '#e5d008',
            color: '#fff',
          }}
          onClick={() => setType(type === 'OL' ? 'AL' : 'OL')}
        >
          Switch to {type === 'OL' ? 'Advanced Level' : 'Ordinary Level'}
        </button>
      </div>

      <button
        className="btn"
        style={{
          backgroundColor: '#ac6d06',
          color: '#fff',
        }}
        onClick={() => {
          setIsAddMode(true);
          setIsEditMode(false);
          setShowModal(true); // Show the modal when adding a new pass paper
        }}
      >
        Add New Pass Paper
      </button>
      <br />

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {passPapers.map((paper) => (
          <div key={paper._id} className="col">
            <div className="card shadow-sm border h-100">
              <div className="card-body">
                <h5 className="card-title">{paper.passYear}</h5>
                <p className="card-text">{paper.description}</p>
                <button className="btn btn-warning btn-sm" onClick={() => handleEditPassPaper(paper)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm ml-3" onClick={() => handleDeletePassPaper(paper._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/editing pass paper */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Pass Paper' : 'Add New Pass Paper'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={isEditMode ? handleUpdatePassPaper : handleAddPassPaper}>
            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={passPaper.description}
              onChange={(e) => setPassPaper({ ...passPaper, description: e.target.value })}
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Pass Year"
              value={passPaper.passYear}
              onChange={(e) => setPassPaper({ ...passPaper, passYear: e.target.value })}
              required
            />
            <input
              type="file"
              className="form-control mb-2"
              accept="application/pdf"
              onChange={(e) => setPassPaper({ ...passPaper, pdfFile: e.target.files[0] })}
              required
            />
            <button type="submit" className="btn btn-success">
              {isEditMode ? 'Update Pass Paper' : 'Add Pass Paper'}
            </button>
            {isEditMode && (
              <button type="button" className="btn btn-secondary ml-2" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default PassPapersManagement;
