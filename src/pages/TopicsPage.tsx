// src/pages/TopicsPage.tsx

import { Link } from 'react-router-dom';

const topicsForGrade2 = [
  { name: "Qo'shish va Ayirish", path: "/test/math-grade-2/topic-1" },
  { name: "Ko'paytirish Jadvali", path: "/test/math-grade-2/topic-2" },
  { name: "Sodda Tenglamalar", path: "/test/math-grade-2/topic-3" },
];

export default function TopicsPage() {
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>2-sinf Matematika Mavzulari</h2>
        <p>O'zingizga kerakli mavzuni tanlang va testni boshlang.</p>
      </div>
      <div className="test-type-container"> 
        {topicsForGrade2.map((topic) => (
          <Link to={topic.path} key={topic.path} className="test-type-card">
            <h3>{topic.name}</h3>
            <p>Ushbu mavzu bo'yicha testlarni ishlash →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}