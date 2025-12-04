"use client";

import {
  CheckQuestionResponse,
  Question,
  QuestionsResponse,
} from "@/lib/types/questions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import ResultsChart from "./results-chart";
import { getAnswerByKey } from "../_utils/get-answer-key";
import ResultsButtons from "./results-buttons";

type ResultsProps = {
  result: CheckQuestionResponse;
  data: SuccessResponse<QuestionsResponse>;
};

export default function Results({ result, data }: ResultsProps) {
  return (
    <div className="mt-10">
      <h2 className="text-primary font-semibold text-2xl mb-3">Results:</h2>
      <div className="flex flex-row gap-9">
        <ResultsChart result={result} />
        <div className="border border-gray-100 flex-1 p-2 h-[514px] overflow-y-auto">
          {result.WrongQuestions.map((question) => {
            const questionData = data.questions.find(
              (ques: Question) => ques._id === question.QID
            );
            if (!questionData) return null;

            return (
              <div key={question.QID} className="p-2">
                <div className="text-primary text-xl font-semibold mb-3">
                  {question.Question}
                </div>
                <RadioGroup className="space-y-2 pointer-events-none">
                  {/* Incorrect answer */}
                  <div className="flex items-center space-x-2 bg-red-50 p-4">
                    <RadioGroupItem
                      value="incorrect"
                      checked={true}
                      className="border-red-500 text-red-500"
                    />
                    <Label className="m-0">
                      {getAnswerByKey(questionData, question.inCorrectAnswer)}
                    </Label>
                  </div>

                  {/* Correct answer */}
                  <div className="flex items-center space-x-2 bg-emerald-50 p-4">
                    <RadioGroupItem
                      value="correct"
                      checked={true}
                      className="border-green-600 text-emerald-600"
                    />
                    <Label className="m-0">
                      {getAnswerByKey(questionData, question.correctAnswer)}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            );
          })}
          {result.correctQuestions.map((question) => {
            const questionData = data.questions.find(
              (ques: Question) => ques._id === question.QID
            );
            if (!questionData) return null;

            return (
              <div key={question.QID} className="p-2">
                <div className="text-primary text-xl font-semibold mb-3">
                  {question.Question}
                </div>
                <RadioGroup className="space-y-2 pointer-events-none">
                  {/* Correct answer */}
                  <div className="flex items-center space-x-2 bg-emerald-50 p-4">
                    <RadioGroupItem
                      value="correct"
                      checked={true}
                      className="border-green-600 text-emerald-600"
                    />
                    <Label className="m-0">
                      {getAnswerByKey(questionData, question.correctAnswer)}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            );
          })}
        </div>
      </div>
      <ResultsButtons />
    </div>
  );
}
