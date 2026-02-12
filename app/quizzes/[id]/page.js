"use client";

import { useSession } from "next-auth/react";
import { useGetPublicQuizQuery, useSubmitQuizAttemptMutation } from "@/store/api";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function QuizRunnerPage({ params }) {
  const { data: session } = useSession();
  const { data, isLoading } = useGetPublicQuizQuery(params.id);
  const [submitAttempt, { isLoading: submitting }] = useSubmitQuizAttemptMutation();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const quiz = data?.quiz;
  const totalPoints = useMemo(() => {
    if (!quiz?.questions) return 0;
    return quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0);
  }, [quiz]);

  const handleSelect = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      toast.error("Please log in to submit your quiz.");
      return;
    }

    if (Object.keys(answers).length < quiz.questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const payload = {
      answers: Object.entries(answers).map(([qIndex, selectedIndex]) => ({
        questionIndex: Number(qIndex),
        selectedIndex
      }))
    };

    try {
      const res = await submitAttempt({ quizId: params.id, ...payload }).unwrap();
      setResult(res.attempt);
      setFeedback(res.feedback || []);
      toast.success("Quiz submitted.");
    } catch (err) {
      toast.error(err?.data?.error || "Could not submit quiz.");
    }
  };

  if (isLoading) {
    return (
      <main className="main">
        <Loader label="Loading quiz..." />
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="main">
        <p>Quiz not found.</p>
      </main>
    );
  }

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>{quiz.title}</span>
          <span className="badge">{quiz.level}</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/quizzes">
            Back to Quizzes
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-card">
          <h2 className="section-title">Instructions</h2>
          <p>{quiz.description || "Answer each question and submit."}</p>
          <p style={{ marginTop: 8 }}>Total points: {totalPoints}</p>
          {!session?.user?.email && (
            <p style={{ marginTop: 10 }}>
              Please log in to save your score and feedback.
            </p>
          )}
        </div>
        <div className="hero-card">
          <h2 className="section-title">Your Result</h2>
          {result ? (
            <div>
              <p>
                Score: {result.score}/{result.totalPoints}
              </p>
              <p>Percentage: {result.percentage}%</p>
            </div>
          ) : (
            <p>Complete the quiz to see your score.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="section-title">Questions</h2>
        <div className="grid">
          {quiz.questions.map((question, qIndex) => (
            <div className="card" key={qIndex}>
              <h3>{question.prompt}</h3>
              <div className="form">
                {question.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className="input"
                    style={{
                      cursor: "pointer",
                      borderColor:
                        feedback.length && feedback[qIndex]?.correctIndex === optIndex
                          ? "#34a853"
                          : undefined,
                      background:
                        feedback.length && feedback[qIndex]?.correctIndex === optIndex
                          ? "#e9f8ee"
                          : undefined
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={answers[qIndex] === optIndex}
                      onChange={() => handleSelect(qIndex, optIndex)}
                      style={{ marginRight: 8 }}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {feedback.length ? (
                <p style={{ marginTop: 10 }}>
                  {feedback[qIndex]?.isCorrect ? "Correct!" : "Needs review."}{" "}
                  {feedback[qIndex]?.explanation}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        <div className="cta-row" style={{ marginTop: 16 }}>
          <button
            className="button primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      </section>
    </main>
  );
}
