// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>O'rganishni boshlang</h2>
        <p>O'zingizga ma'qul bo'lgan fanni tanlang va bilimingizni sinab ko'ring.</p>
      </div>
      <div className="subject-cards-container">
        <div className="subject-card blue">
          <div className="card-icon">🧮</div>
          <h3>Matematika</h3>
          <p>Mantiqiy fikrlash va hisoblash qobiliyatingizni oshiring.</p>
          <Link to="/subject/math" className='card-link'>Boshlash</Link>
        </div>
        <div className="subject-card green">
          <div className="card-icon">🌐</div>
          <h3>Ingliz tili</h3>
          <p>Chet tilini oson va qiziqarli tarzda o'rganing.</p>
          <a href="#" className="card-link">Boshlash ›</a>
        </div>
      </div>
    </main>
  );
}