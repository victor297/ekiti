"use client";

import { useSession } from "next-auth/react";
import { useDeleteQuizMutation, useGetQuizzesQuery, useGetTopicsQuery } from "@/store/api";
import { useState } from "react";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function QuizListPage() {
  const { data: session, status } = useSession();
  const { data: topicsData, isFetching: topicsLoading } = useGetTopicsQuery();
  const [topicId, setTopicId] = useState("");
  const { data: quizzesData, isFetching: quizzesLoading } = useGetQuizzesQuery(
    topicId || undefined
  );
  const [deleteQuiz] = useDeleteQuizMutation();

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading quizzes..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Quiz Editor</h1>
        <p>Please sign in to manage quizzes.</p>
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
        <h1 className="section-title">Quiz Editor</h1>
        <p>Only teachers can access the quiz editor.</p>
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
          <span>Quiz Editor</span>
          <span className="badge">Teacher</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher">
            Back to Dashboard
          </a>
          <a className="button primary" href="/teacher/quizzes/new">
            Create Quiz
          </a>
        </div>
      </nav>

      <section className="hero" style={{ display: 'block' }}>
        <div className="hero-card" style={{ marginBottom: 24 }}>
          <h2 className="section-title">Filter by Topic</h2>
          {topicsLoading && <Loader label="Loading topics..." />}
          <select
            className="input"
            value={topicId}
            onChange={(event) => setTopicId(event.target.value)}
          >
            <option value="">All topics</option>
            {(topicsData?.topics || []).map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        <div className="hero-card">
          <h2 className="section-title">Quizzes</h2>
          {quizzesLoading && <Loader label="Loading quizzes..." />}
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(quizzesData?.quizzes || []).map((quiz) => (
                  <tr key={quiz._id}>
                    <td style={{ fontWeight: 600 }}>{quiz.title}</td>
                    <td>{quiz.topicId?.name || "General"}</td>
                    <td>{quiz.description || "No description"}</td>
                    <td>
                      <div className="cta-row" style={{ marginTop: 0, gap: 8 }}>
                        <a
                           className="button secondary" 
                           href={`/teacher/quizzes/${quiz._id}`}
                           style={{ padding: "6px 12px", fontSize: 12 }}
                        >
                          Edit
                        </a>
                        <button
                          className="button secondary"
                          style={{ padding: "6px 12px", fontSize: 12, color: "#c0392b", background: "#fff1f0" }}
                          onClick={async () => {
                            if (!confirm("Delete this quiz?")) return;
                            try {
                              await deleteQuiz(quiz._id).unwrap();
                              toast.success("Quiz deleted.");
                            } catch (err) {
                              toast.error(err?.data?.error || "Delete failed.");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!quizzesData?.quizzes?.length && !quizzesLoading && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                       No quizzes found. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
