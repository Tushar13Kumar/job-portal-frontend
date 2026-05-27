import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = process.env.REACT_APP_API_URL;

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/api/jobs/${id}`);
        setJob(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Job not found!');
        navigate('/');
      }
    };
    fetchJob();
  }, [id, navigate]);

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/')}>
        ← Back
      </button>
      <div className="card shadow-sm border-0 p-4">
        <h2 className="fw-bold">{job.title}</h2>
        <h5 className="text-primary">{job.company}</h5>
        <hr />
        <div className="row mb-3">
          <div className="col-6">
            <p className="mb-1 text-muted">📍 Location</p>
            <p className="fw-semibold">{job.location}</p>
          </div>
          <div className="col-6">
            <p className="mb-1 text-muted">💰 Salary</p>
            <p className="fw-semibold">₹{job.salary.toLocaleString()}/year</p>
          </div>
          <div className="col-6">
            <p className="mb-1 text-muted">💼 Job Type</p>
            <span className="badge bg-secondary">{job.jobType}</span>
          </div>
        </div>
        <h5 className="fw-bold mt-3">Job Description</h5>
        <p className="text-muted">{job.description}</p>
        <h5 className="fw-bold mt-3">Qualifications</h5>
        <ol>
          {job.qualifications.map((q, i) => (
            <li key={i} className="text-muted">{q}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default JobDetailPage;