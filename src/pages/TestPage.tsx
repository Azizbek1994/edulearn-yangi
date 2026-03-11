// src/pages/TestPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Marshrutni o'zgartirish uchun

// Hozircha faqat 2-sinf savollarini import qilamiz
import questions from '../questions.json';

export default function TestPage() {
  const navigate = useNavigate(); // Sahifani o'zgartirish funksiyasi
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        // Natijani hisoblab, yangi sahifaga jo'natish
        const score = questions.reduce((score, question, index) => {
            // newAnswers'dan foydalanamiz, chunki userAnswers hali yangilanmagan bo'lishi mumkin
            return question.correctAnswer === newAnswers[index] ? score + 1 : score;
        }, 0);
        
        // Natija sahifasiga o'tish va natijani o'zi bilan olib ketish
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