import { AnswerCheckBody, CheckQuestionResponse } from "../types/questions";


export async function submitAnswers(answers: AnswerCheckBody) {
  try {
    const response = await fetch("/api/check-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    const payload: ApiResponse<CheckQuestionResponse> = await response.json();

    if ("code" in payload) {
      return { ok: false, error: payload.message };
    }

    return { ok: true, data: payload };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}