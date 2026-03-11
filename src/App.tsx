// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage'; // YANGI
import ResultPage from './pages/ResultPage'; // YANGI
import SubjectPage from './pages/SubjectPage';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/math" element={<SubjectPage />} /> {/* YANGI */}
          <Route path="/test/math-grade-2" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;