import { useState } from 'react';

import questions from './questions.json';

type Page = 'HOME' | 'TEST' | 'RESULT';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // Testni boshlash funksiyasi
  const startTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentPage('TEST');
  };

  // Javobni tanlash funksiyasi
  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    // Keyingi savolga o'tish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Agar savollar tugasa, natija sahifasiga o'tish
      setCurrentPage('RESULT');
    }
  };
  
  // To'g'ri javoblar sonini hisoblash
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  // Bosh sahifa
  if (currentPage === 'HOME') {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">O'quv Platformasi</h1>
        <p className="text-lg mb-8">O'z sinfingizni tanlang va bilimingizni sinab ko'ring!</p>
        <div className="flex justify-center gap-4">
          <button onClick={startTest} className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:bg-blue-700">
            2-sinf Matematika
          </button>
        </div>
      </div>
    );
  }

  // Test sahifasi
  if (currentPage === 'TEST') {
    const question = questions[currentQuestionIndex];
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-2">Savol {currentQuestionIndex + 1} / {questions.length}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <p className="text-xl mb-4">{question.question}</p>
          <div className="flex flex-col gap-3">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="border border-gray-300 p-3 rounded-lg text-left text-lg hover:bg-gray-100 focus:bg-blue-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Natija sahifasi
  if (currentPage === 'RESULT') {
    const score = calculateScore();
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Test Natijasi</h1>
        <p className="text-3xl mb-8">
          Siz <span className="font-bold">{questions.length}</span> ta savoldan <span className="font-bold text-green-600">{score}</span> tasiga to'g'ri javob berdingiz!
        </p>
        <button onClick={() => setCurrentPage('HOME')} className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-blue-700">
          Qaytadan Boshlash
        </button>
      </div>
    );
  }

  return null;
}

export default App;