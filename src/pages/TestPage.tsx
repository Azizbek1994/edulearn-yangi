 // src/pages/TestPage.tsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allTestData } from '../data';

// --- Tiplar (o'zgarishsiz) ---
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}
type TestParams = {
  subjectId: keyof typeof allTestData;
  sectionId: string;
  topicId: string;
}

export default function TestPage() {
  const navigate = useNavigate();
  const { subjectId, sectionId, topicId } = useParams<TestParams>();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // --- YAKUNIY VA TO'G'RI useEffect BLOKI ---
  useEffect(() => {
    const getQuestions = async () => {
      if (!subjectId || !sectionId || !topicId) {
        setLoading(false);
        return;
      }
      
      const subject = allTestData[subjectId];
      const section = subject?.sections[sectionId as keyof typeof subject.sections];
      const topicData = section?.topics[topicId as keyof typeof section.topics];

      if (!topicData) {
        setLoading(false);
        return;
      }

      try {
        // 1. Vite'ga barcha .json fayllarni oldindan topishni aytamiz
        const questionFiles = import.meta.glob('../questions/*.json');
        
        // 2. Bizga kerakli faylning to'liq yo'lini yaratamiz
        const modulePath = `../questions/${topicData.questionsFile}`;

        // 3. Agar bizga kerakli fayl ro'yxatda mavjud bo'lsa...
        if (questionFiles[modulePath]) {
          // ...uni chaqiramiz (yuklaymiz)
          const module = await questionFiles[modulePath]();
          const allQuestionsInFile = (module as any).default;
          
          // 4. Fayl ichidan kerakli ID dagi savollar to'plamini olamiz
          const specificQuestions = allQuestionsInFile[topicData.questionSetId];

          if (specificQuestions) {
            setQuestions(specificQuestions);
          } else {
            console.error(`XATO: Savollar to'plami topilmadi. Fayl: ${modulePath}, ID: ${topicData.questionSetId}`);
            setQuestions([]);
          }
        } else {
          console.error(`XATO: Savol fayli topilmadi: ${modulePath}`);
          setQuestions([]);
        }
      } catch (error) {
        console.error("XATO: Savollarni yuklashda kutilmagan xatolik yuz berdi:", error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [subjectId, sectionId, topicId]);

  // --- Qolgan barcha funksiyalar va JSX (o'zgarishsiz) ---
  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(answer);
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        const score = questions.reduce((score, question, index) => {
            return question.correctAnswer === newAnswers[index] ? score + 1 : score;
        }, 0);
        navigate('/result', { state: { score: score, total: questions.length } });
      }
    }, 1500);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) return "";
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (option === correctAnswer) return "correct";
    if (option === selectedAnswer && option !== correctAnswer) return "incorrect";
    return "";
  };

  if (loading) {
    return <div className="card">Savollar yuklanmoqda...</div>;
  }

  if (questions.length === 0) {
    return <div className="card">Bu bo'lim uchun hali savollar qo'shilmagan yoki yuklashda xatolik yuz berdi.</div>;
  }
 const question = questions[currentQuestionIndex];

  return (
    <div className="card">
      <div className="progress-container">
        <p className="progress-text">Savol {currentQuestionIndex + 1} / {questions.length}</p>
        <div className="progress-bar-background">
          <div
            className="progress-bar-foreground"
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <h2 className="question-text">{question.question}</h2>
      <div className="options-container">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            className={`option-button ${getButtonClass(option)} ${isAnswered ? 'disabled' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}