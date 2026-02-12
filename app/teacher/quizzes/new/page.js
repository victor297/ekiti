"use client";

import { useSession } from "next-auth/react";
import { useCreateQuizMutation, useGetTopicsQuery } from "@/store/api";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function NewQuizPage() {
  const { data: session, status } = useSession();
  const { data: topicsData } = useGetTopicsQuery();
  const [createQuiz, { isLoading }] = useCreateQuizMutation();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      topicId: "",
      questions: [
        {
          prompt: "",
          options: ["", "", "", ""],
          correctIndex: 0,
          explanation: "",
          points: 1
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const onSubmit = async (values) => {
    try {
      await createQuiz(values).unwrap();
      toast.success("Quiz created.");
      reset();
    } catch (err) {
      toast.error(err?.data?.error || "Could not create quiz.");
    }
  };

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading quiz builder..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Create Quiz</h1>
        <p>Please sign in to create quizzes.</p>
        <div className="cta-row">
          <a className="button primary" href="/">
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  if (session.user.role !== "teacher") {
    return (
      <main className="main">
        <h1 className="section-title">Create Quiz</h1>
        <p>Only teachers can create quizzes.</p>
        <div className="cta-row">
          <a className="button primary" href="/">
            Go to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>Create Quiz</span>
          <span className="badge">Teacher</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher/quizzes">
            Back to Quizzes
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-card">
          <h2 className="section-title">Quiz Details</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="input"
              placeholder="Quiz title"
              {...register("title", { required: true })}
            />
            <textarea
              className="input"
              rows="3"
              placeholder="Quiz description"
              {...register("description")}
            />
            <select className="input" {...register("topicId", { required: true })}>
              <option value="">Select topic</option>
              {(topicsData?.topics || []).map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>

            <h3 style={{ marginTop: 12 }}>Questions</h3>
            {fields.map((field, index) => (
              <div className="card" key={field.id}>
                <input
                  className="input"
                  placeholder={`Question ${index + 1}`}
                  {...register(`questions.${index}.prompt`, { required: true })}
                />
                {[0, 1, 2, 3].map((optIndex) => (
                  <input
                    key={optIndex}
                    className="input"
                    placeholder={`Option ${optIndex + 1}`}
                    {...register(`questions.${index}.options.${optIndex}`, {
                      required: true
                    })}
                  />
                ))}
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="3"
                  placeholder="Correct option index (0-3)"
                  {...register(`questions.${index}.correctIndex`, {
                    valueAsNumber: true
                  })}
                />
                <input
                  className="input"
                  type="number"
                  min="1"
                  placeholder="Points"
                  {...register(`questions.${index}.points`, {
                    valueAsNumber: true
                  })}
                />
                <textarea
                  className="input"
                  rows="2"
                  placeholder="Explanation (optional)"
                  {...register(`questions.${index}.explanation`)}
                />
                <div className="cta-row">
                  <button
                    className="button secondary"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove Question
                  </button>
                </div>
              </div>
            ))}

            <div className="cta-row">
              <button
                className="button secondary"
                type="button"
                onClick={() =>
                  append({
                    prompt: "",
                    options: ["", "", "", ""],
                    correctIndex: 0,
                    explanation: "",
                    points: 1
                  })
                }
              >
                Add Question
              </button>
              <button className="button primary" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Create Quiz"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
