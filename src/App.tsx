import { useState } from 'react';
import questions from './questions.json';

type Page = 'HOME' | 'TEST' | 'RESULT';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const startTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentPage('TEST');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentPage('RESULT');
      }
    }, 300); // Javob bergandan keyin 0.3 soniya kutib o'tish
  };
  
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return question.correctAnswer === userAnswers[index] ? score + 1 : score;
    }, 0);
  };

  const renderHomePage = () => (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-2xl w-full transform transition-all duration-500">
      <h1 className="text-5xl font-extrabold mb-3 text-slate-800">EduLearn</h1>
      <p className="text-lg text-slate-600 mb-8">Bilimingizni sinab ko'ring va yangi cho'qqilarni zabt eting!</p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={startTest} 
          className="bg-blue-600 text-white font-bold py-4 px-10 rounded-xl text-2xl transform hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
        >
          2-sinf Matematika
        </button>
      </div>
    </div>
  );

  const renderTestPage = () => {
    const question = questions[currentQuestionIndex];
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-full transform transition-all duration-500">
        <div className="mb-4">
          <p className="text-sm text-slate-500">Savol {currentQuestionIndex + 1} / {questions.length}</p>
          <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{question.question}</h2>
        <div className="flex flex-col gap-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="border-2 border-slate-200 p-4 rounded-xl text-left text-lg hover:bg-blue-50 hover:border-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-2xl w-full transform transition-all duration-500">
        <h1 className="text-5xl font-extrabold mb-4 text-slate-800">Natija!</h1>
        <p className="text-2xl text-slate-600 mb-6">
          Siz <span className="font-bold text-blue-600">{questions.length}</span> ta savoldan <span className="font-bold text-green-600">{score}</span> tasiga to'g'ri javob berdingiz!
        </p>
        <button 
          onClick={() => setCurrentPage('HOME')} 
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl text-xl transform hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
        >
          Qaytadan Boshlash
        </button>
      </div>
    );
  };
 return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-100">
      {currentPage === 'HOME' && renderHomePage()}
      {currentPage === 'TEST' && renderTestPage()}
      {currentPage === 'RESULT' && renderResultPage()}
    </div>
  );
}

export default App;