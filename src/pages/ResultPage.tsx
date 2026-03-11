// src/pages/ResultPage.tsx

import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Test sahifasidan yuborilgan ma'lumotlarni olish
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="card">
      <h1 className="title">Natija!</h1>
      <p className="result-text">
        Siz <span className="total-questions-text">{total}</span> ta savoldan <span className="score-text">{score}</span> tasiga to'g'ri javob berdingiz!
      </p>
      <button onClick={() => navigate('/')} className="main-button">
        Bosh Sahifaga
      </button>
    </div>
  );
}