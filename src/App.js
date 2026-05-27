import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import PostJobPage from './pages/PostJobPage';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
      </Routes>
    </Router>
  );
}

export default App;