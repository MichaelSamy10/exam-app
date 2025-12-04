export type Answer = {
  answer: string;
  key: string;
};

export type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type Question = {
  _id: string;
  question: string;
  type: string;
  answers: Answer[];
  correct: string;
  subject: string | null;
  exam: Exam;
  createdAt: string;
};

export type QuestionsResponse = {
  questions: Question[];
};

export type AnswerCheckBody = {
  questionId?: string;
  correct: string;
}[];

type QuestionAnswer = {
  QID: string;
  Question: string;
  correctAnswer: string;
};

type WrongQuestionAnswer = QuestionAnswer & {
  inCorrectAnswer: string;
};

type CheckQuestionResponse = {
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestionAnswer[];
  correctQuestions: QuestionAnswer[];
};
