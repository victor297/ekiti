"use client";

import { useSession } from "next-auth/react";
import { useDeleteQuizMutation, useGetQuizQuery, useUpdateQuizMutation } from "@/store/api";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "@/components/Loader";

export default function EditQuizPage({ params }) {
  const { data: session, status } = useSession();
  const { data, isLoading } = useGetQuizQuery(params.id);
  const [updateQuiz, { isLoading: saving }] = useUpdateQuizMutation();
  const [deleteQuiz, { isLoading: deleting }] = useDeleteQuizMutation();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      topicId: "",
      questions: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  useEffect(() => {
    if (data?.quiz) {
      reset({
        title: data.quiz.title,
        description: data.quiz.description,
        topicId: data.quiz.topicId,
        questions: data.quiz.questions.map((q) => ({
          prompt: q.prompt,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          points: q.points
        }))
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    try {
      await updateQuiz({ quizId: params.id, ...values }).unwrap();
      toast.success("Quiz updated.");
    } catch (err) {
      toast.error(err?.data?.error || "Could not update quiz.");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <main className="main">
        <Loader label="Loading quiz..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Edit Quiz</h1>
        <p>Please sign in to edit quizzes.</p>
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
        <h1 className="section-title">Edit Quiz</h1>
        <p>Only teachers can edit quizzes.</p>
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
          <span>Edit Quiz</span>
          <span className="badge">Teacher</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher/quizzes">
            Back to Quizzes
          </a>
          <button
            className="button secondary"
            type="button"
            disabled={deleting}
            onClick={async () => {
              if (!confirm("Delete this quiz?")) return;
              try {
                await deleteQuiz(params.id).unwrap();
                toast.success("Quiz deleted.");
                window.location.href = "/teacher/quizzes";
              } catch (err) {
                toast.error(err?.data?.error || "Delete failed.");
              }
            }}
          >
            {deleting ? "Deleting..." : "Delete Quiz"}
          </button>
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
              <button className="button primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
