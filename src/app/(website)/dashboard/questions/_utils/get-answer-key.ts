import { Question } from "@/lib/types/questions";

export function getAnswerByKey(question: Question, key: string) {
  const foundAnswer = question.answers.find((answer) => answer.key === key);
  return foundAnswer ? foundAnswer.answer : "";
}