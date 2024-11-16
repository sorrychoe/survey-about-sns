import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SurveyForm from './SurveyForm';
import SubmissionSuccess from './SubmissionSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurveyForm />} />
        <Route path="/success" element={<SubmissionSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
