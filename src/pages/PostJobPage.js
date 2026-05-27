import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

const initialState = {
  title: '', company: '', location: '',
  salary: '', jobType: '', description: '', qualifications: ''
};

function PostJobPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    for (let key in form) {
      if (!form[key].toString().trim()) {
        toast.error(`Please fill in: ${key}`);
        return false;
      }
    }
    if (isNaN(form.salary) || Number(form.salary) <= 0) {
      toast.error('Salary must be a valid number!');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/api/jobs`, form);
      toast.success('Job posted successfully!');
      setForm(initialState);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error('Failed to post job!');
    }
    setLoading(false);
  };

  return (
    <div className="container py-4" style={{ maxWidth: '650px' }}>
      <h2 className="fw-bold mb-4">Post a Job</h2>
      <div className="card shadow-sm border-0 p-4">
        <form onSubmit={handleSubmit}>
          {[
            { name: 'title', label: 'Job Title', type: 'text', placeholder: 'e.g. Frontend Developer' },
            { name: 'company', label: 'Company Name', type: 'text', placeholder: 'e.g. Google' },
            { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Bangalore, India' },
            { name: 'salary', label: 'Salary (per year)', type: 'number', placeholder: 'e.g. 800000' },
          ].map(field => (
            <div className="mb-3" key={field.name}>
              <label className="form-label fw-semibold">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                className="form-control"
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label fw-semibold">Job Type</label>
            <select name="jobType" className="form-select" value={form.jobType} onChange={handleChange}>
              <option value="">-- Select Job Type --</option>
              <option>Full-time (On-site)</option>
              <option>Part-time (On-site)</option>
              <option>Full-time (Remote)</option>
              <option>Part-time (Remote)</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Job Description</label>
            <textarea
              name="description"
              className="form-control"
              rows={4}
              placeholder="Describe the role and responsibilities..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Required Qualifications</label>
            <input
              type="text"
              name="qualifications"
              className="form-control"
              placeholder="e.g. React JS, Node JS, MongoDB (comma separated)"
              value={form.qualifications}
              onChange={handleChange}
            />
            <div className="form-text">Comma se alag karo: React JS, Node JS, MongoDB</div>
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJobPage;