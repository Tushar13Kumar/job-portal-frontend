import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import { toast } from 'react-toastify';

const API = process.env.REACT_APP_API_URL;

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/api/jobs`);
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load jobs!');
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setJobs(prev => prev.filter(job => job._id !== id));
  };

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Available Jobs</h2>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="🔍 Search by job title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted py-5">
          <h5>No jobs found</h5>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filtered.map(job => (
            <div className="col" key={job._id}>
              <JobCard job={job} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;