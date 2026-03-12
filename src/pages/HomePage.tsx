// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { allTestData } from '../data';

export default function HomePage() {
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>O'rganishni boshlang</h2>
        <p>O'zingizga ma'qul bo'lgan fanni tanlang va bilimingizni sinab ko'ring.</p>
      </div>
      <div className="subject-cards-container">
        <Link to="/subject/math" className="subject-card blue">
          <div className="card-icon">🧮</div>
          <h3>{allTestData.math.name}</h3>
          <p>{allTestData.math.description}</p>
          <span className="card-link">Boshlash ›</span>
        </Link>
        <Link to="/subject/english" className="subject-card green">
          <div className="card-icon">🌐</div>
          <h3>{allTestData.english.name}</h3>
          <p>{allTestData.english.description}</p>
          <span className="card-link">Boshlash ›</span>
        </Link>
      </div>
    </main>
  );
}