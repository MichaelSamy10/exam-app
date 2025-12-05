import { getQuestions } from "@/lib/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCallback, useEffect, useState } from "react";
import { AnswerCheckBody, CheckQuestionResponse } from "@/lib/types/questions";
import { submitAnswers } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Results from "./results";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import { formatTime } from "../_utils/format-time";
import { Spinner } from "@/components/ui/spinner";

export default function QuestionCard() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("examId");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerCheckBody>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [result, setResult] = useState<CheckQuestionResponse | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["Questions", examId],
    queryFn: () => getQuestions(examId || ""),
  });

  const durationMinutes = data?.questions?.[0]?.exam?.duration || 0;
  const durationSeconds = durationMinutes * 60;

  const currentQuestion = data?.questions?.[currentIndex] || null;
  const numOfQuestions = data?.questions.length || 0;

  const questionsProgress =
    timeLeft === 0
      ? 100
      : numOfQuestions > 0
      ? ((currentIndex + 1) / numOfQuestions) * 100
      : 0;

  const timerProgress =
    timeLeft && durationSeconds
      ? Math.round((timeLeft / durationSeconds) * 100)
      : 0;

  const handleSelect = (answerKey: string) => {
    setAnswers((prev) => {
      const existsIndex = prev.findIndex(
        (a) => a.questionId === currentQuestion?._id
      );

      if (existsIndex !== -1) {
        const updated = [...prev];
        updated[existsIndex] = {
          questionId: currentQuestion?._id,
          correct: answerKey,
        };
        return updated;
      } else {
        return [
          ...prev,
          { questionId: currentQuestion?._id, correct: answerKey },
        ];
      }
    });
  };

  const handleNext = () => {
    if (currentIndex < numOfQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = useCallback(async () => {
    try {
      const payload = answers && answers.length ? answers : [];

      const result = await submitAnswers(payload);

      setResult(result);
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  }, [answers]);

  useEffect(() => {
    if (durationSeconds > 0 && timeLeft === null) {
      setTimeLeft(durationSeconds);
    }
  }, [durationSeconds, timeLeft]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev || prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, handleSubmit]);

  return (
    <div className="bg-white p-6">
      {isLoading && (
        <Spinner className="size-24 m-auto text-primary min-h-screen" />
      )}

      {data && (
        <div>
          <div className="flex flex-row justify-between text-secondary">
            <h3>Frontend Development - {currentQuestion?.exam.title}</h3>

            <div>
              Question{" "}
              <span className="text-primary font-bold">{currentIndex + 1}</span>{" "}
              of {numOfQuestions}
            </div>
          </div>

          <Progress value={questionsProgress} className="w-full h-3 mt-1" />

          {!result ? (
            <div className="mt-10">
              <h3 className="text-blue-600 text-2xl font-semibold">
                {currentQuestion?.question}
              </h3>
              <RadioGroup
                value={
                  answers.find((a) => a.questionId === currentQuestion?._id)
                    ?.correct || ""
                }
                onValueChange={handleSelect}
                className="mt-4"
              >
                {currentQuestion?.answers.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-3 p-4 bg-gray-50 text-gray-800"
                    onClick={() => handleSelect(item.key)}
                  >
                    <RadioGroupItem
                      value={item.key}
                      id={item.key}
                      className="data-[state=checked]:border-blue-500"
                    />
                    <Label htmlFor={item.key}>{item.answer}</Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="mt-12 flex justify-between items-center gap-2 w-full">
                <Button
                  variant={"default"}
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex-1"
                >
                  <ChevronLeft />
                  Previous
                </Button>
                <div className="relative flex items-center justify-center ms-4 me-4">
                  <CircularProgress
                    value={timerProgress}
                    size={80}
                    strokeWidth={12}
                  />

                  <span className="absolute text-xs">
                    {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
                  </span>
                </div>
                {currentIndex < numOfQuestions - 1 ? (
                  <Button
                    variant={"default"}
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Next <ChevronLeft className="rotate-180" />
                  </Button>
                ) : (
                  <Button
                    variant={"destructive"}
                    onClick={handleSubmit}
                    className="px-4 py-2 flex-1"
                  >
                    Finish
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <Results result={result} data={data} />
          )}
        </div>
      )}
    </div>
  );
}
