import { useState } from 'react';
import questions from './questions.json';

type Page = 'HOME' | 'TEST' | 'RESULT';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  // Yangi holatlar:
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Foydalanuvchi tanlagan javob
  const [isAnswered, setIsAnswered] = useState(false); // Javob berildimi?

  const startTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentPage('TEST');
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return; // Agar javob berib bo'lingan bo'lsa, hech narsa qilma

    setIsAnswered(true);
    setSelectedAnswer(answer);

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    // Keyingi savolga o'tishdan oldin 1.5 soniya kutish
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        setCurrentPage('RESULT');
      }
    }, 1500); 
  };
  
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return question.correctAnswer === userAnswers[index] ? score + 1 : score;
    }, 0);
  };

  // Javob tugmalariga rang berish uchun funksiya
  const getButtonClass = (option: string) => {
  if (!isAnswered) {
    return ""; // Standart holatda qo'shimcha klass yo'q
  }
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (option === correctAnswer) {
    return "correct"; // To'g'ri javob uchun
  }
  if (option === selectedAnswer && option !== correctAnswer) {
    return "incorrect"; // Tanlangan noto'g'ri javob uchun
  }
  return ""; // Boshqa variantlar uchun
};

  const renderHomePage = () => (
  // Bu oq kartochka uchun umumiy konteyner
  <div className="card"> 
    <h1 className="title">EduLearn</h1>
    <p className="subtitle">Bilimingizni sinab ko'ring va yangi cho'qqilarni zabt eting!</p>
    <div className="button-container">
      <button onClick={startTest} className="main-button">
        2-sinf Matematika
      </button>
    </div>
  </div>
  );

  const renderTestPage = () => {
  const question = questions[currentQuestionIndex];
  return (
    // Bu ham o'sha umumiy oq kartochka
    <div className="card"> 
      <div className="progress-container">
        <p className="progress-text">Savol {currentQuestionIndex + 1} / {questions.length}</p>
        <div className="progress-bar-background">
          <div 
            className="progress-bar-foreground" 
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}% `}}
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
            // Bu yerda klasslar dinamik o'zgaradi, shuning uchun JavaScript'dan foydalanamiz
            className={`option-button ${getButtonClass(option)} ${isAnswered ? 'disabled' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
  const renderResultPage = () => {
  const score = calculateScore();
  return (
    // Bu ham o'sha umumiy oq kartochka
    <div className="card"> 
      <h1 className="title">Natija!</h1>
      <p className="result-text">
        Siz <span className="total-questions-text">{questions.length}</span> ta savoldan <span className="score-text">{score}</span> tasiga to'g'ri javob berdingiz!
      </p>
      {/* Bu tugma Bosh sahifadagi bilan bir xil, shuning uchun o'sha klassni ishlatamiz */}
      <button onClick={startTest} className="main-button">
        Qaytadan Boshlash
      </button>
    </div>
  );
};

  return (
    <div className="app-container">
      {currentPage === 'HOME' && renderHomePage()}
      {currentPage === 'TEST' && renderTestPage()}
      {currentPage === 'RESULT' && renderResultPage()}
    </div>
  );
}

export default App;