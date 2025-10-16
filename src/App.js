import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import FactCheck from './components/FactCheck';
import Result from './components/Result';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/fact-check" element={<FactCheck />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
