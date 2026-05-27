import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = process.env.REACT_APP_API_URL;

function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/api/jobs/${job._id}`);
      toast.success('Job deleted successfully!');
      onDelete(job._id);
    } catch (err) {
      toast.error('Failed to delete job!');
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark">{job.title}</h5>
        <h6 className="text-primary mb-1">{job.company}</h6>
        <p className="text-muted small mb-1">📍 {job.location}</p>
        <span className="badge bg-secondary mb-3 align-self-start">{job.jobType}</span>
        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-primary btn-sm flex-grow-1"
            onClick={() => navigate(`/job/${job._id}`)}
          >
            See Details
          </button>
          <button
            className="btn btn-danger btn-sm flex-grow-1"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;