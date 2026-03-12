// src/data.ts

interface Topic {
  name: string;
  questionsFile: string; // Qaysi katta fayldan olish
  questionSetId: string; // Fayl ichidagi qaysi to'plamni olish
}
    
// ... (qolgan Section, Subject tiplari o'zgarishsiz)
interface Section { name: string; topics: Record<string, Topic>; }
interface Subject { name: string; description: string; sections: Record<string, Section>; }

export const allTestData: Record<string, Subject> = {
  math: {
    name: "Matematika",
    description: "Matematikadan turli sinflar uchun testlar to'plami.",
    sections: {
      "grade-2": {
        name: "2-sinf",
        topics: {
          "topic-1": { name: "Qo'shish va Ayirish", questionsFile: "math-questions.json", questionSetId: "grade-2-topic-1" },
          "topic-2": { name: "Ko'paytirish Jadvali", questionsFile: "math-questions.json", questionSetId: "grade-2-topic-2" },
        },
      },
      "grade-3": {
        name: "3-sinf",
        topics: {
          "topic-1": { name: "Uch xonali sonlar", questionsFile: "math-questions.json", questionSetId: "grade-3-topic-1" },
        },
      },
      "critical-thinking": {
        name: "Mantiqiy Fikrlash",
        topics: {
          "topic-1": { name: "Mantiqiy masalalar", questionsFile: "math-questions.json", questionSetId: "critical-thinking-topic-1" },
        },
      },
    },
  },
  // Ingliz tili uchun ham shunday qilish mumkin, hozircha o'zgarishsiz qoldiramiz
  english: {
    name: "Ingliz Tili",
    description: "Ingliz tilidan testlar.",
    sections: {
      "beginner": {
        name: "Boshlang'ich",
        topics: {
          // Bu hali eski usulda, ishlamaydi, lekin xato ham bermaydi
          "topic-1": { name: "Alphabet", questionsFile: "english-questions.json", questionSetId: "beginner-alphabet" },
        },
      },
    },
  },
};