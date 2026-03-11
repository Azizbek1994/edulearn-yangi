// src/components/Header.tsx
import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">EduLearn Pro</div>
        <nav className="navigation">
          <a href="#" className="nav-link active">Fanlar</a>
          <a href="#" className="nav-link">Oflayn Kurslar</a>
          <a href="#" className="nav-link">Onlayn Kurslar</a>
          <a href="#" className="nav-link">Taklif va Shikoyatlar</a>
        </nav>
        <div className="user-profile">
          <span>Ulugbek Tairov</span>
          <a href="#" className="logout-button">→</a>
        </div>
      </div>
    </header>
  );
}