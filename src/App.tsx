// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SubjectPage from './pages/SubjectPage';
import TopicsPage from './pages/TopicsPage'; // IMPORT QILINGAN
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Dinamik marshrutlar */}
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/subject/:subjectId/:sectionId" element={<TopicsPage />} />
          <Route path="/test/:grade-2-topic-1" element={<TestPage />} /> {/* TestPage'ni ham dinamik qilamiz */}
  
  <Route path="/result" element={<ResultPage />} />
</Routes>
      </div>
    </div>
  );
}

export default App;