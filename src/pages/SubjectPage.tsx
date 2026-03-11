// src/pages/SubjectPage.tsx

import { Link } from 'react-router-dom';

// Bu yerda biz hozircha ma'lumotlarni qo'lda yozib turamiz.
// Kelajakda buni alohida fayldan oladigan qilamiz.
const mathTests = [
  { name: "2-sinf Testlari", path: "/test/math-grade-2" },
  { name: "3-sinf Testlari", path: "/test/math-grade-3" },
  { name: "4-sinf Testlari", path: "/test/math-grade-4" },
  { name: "Muammoni Hal Qilish", path: "/test/problem-solving" },
  { name: "Tanqidiy Fikrlash", path: "/test/critical-thinking" },
  { name: "Prezident Maktabi (1-bosqich)", path: "/test/pm-stage-1" },
  { name: "Prezident Maktabi (2-bosqich)", path: "/test/pm-stage-2" },
];

export default function SubjectPage() {
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Matematika Bo'limlari</h2>
        <p>O'zingizga kerakli bo'limni tanlang va testni boshlang.</p>
      </div>
      <div className="test-type-container">
        {mathTests.map((test) => (
          <Link to={test.path} key={test.path} className="test-type-card">
            <h3>{test.name}</h3>
            <p>Ushbu bo'limdagi testlarni ishlash →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}