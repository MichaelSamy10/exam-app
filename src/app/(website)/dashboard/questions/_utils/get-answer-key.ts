import { Question } from "@/lib/types/questions";

export function getAnswerByKey(question: Question, key: string) {
  // Find answer by key
  const foundAnswer = question.answers.find((answer) => answer.key === key);
  return foundAnswer ? foundAnswer.answer : "";
}
