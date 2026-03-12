// src/pages/SubjectPage.tsx
import { Link, useParams } from 'react-router-dom';
import { allTestData } from '../data';

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: keyof typeof allTestData }>();
      
  if (!subjectId || !allTestData[subjectId]) {
    return <div>Fan topilmadi!</div>;
  }

  const subject = allTestData[subjectId];
  const sections = Object.entries(subject.sections);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{subject.name} Bo'limlari</h2>
        <p>O'zingizga kerakli bo'limni tanlang va testni boshlang.</p>
      </div>
      <div className="test-type-container">
        {sections.map(([sectionKey, sectionData]) => (
          <Link to={`/subject/${subjectId}/${sectionKey}`} key={sectionKey} className="test-type-card">
            <h3>{sectionData.name}</h3>
            <p>Ushbu bo'limdagi testlarni ishlash →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}