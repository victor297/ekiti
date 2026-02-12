"use client";

import { useGetQuizzesQuery } from "@/store/api";
import Loader from "@/components/Loader";

export default function QuizzesPage() {
  const { data, isFetching } = useGetQuizzesQuery();

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>Student Quizzes</span>
          <span className="badge">Practice</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/">
            Home
          </a>
        </div>
      </nav>

      <section>
        <h2 className="section-title">Available Quizzes</h2>
        {isFetching && <Loader label="Loading quizzes..." />}
        <div className="grid">
          {(data?.quizzes || []).map((quiz) => (
            <div className="card" key={quiz._id}>
              <h3>{quiz.title}</h3>
              <p>{quiz.description || "No description"}</p>
              <div className="cta-row" style={{ marginTop: 10 }}>
                <a className="button primary" href={`/quizzes/${quiz._id}`}>
                  Take Quiz
                </a>
              </div>
            </div>
          ))}
          {!data?.quizzes?.length && (
            <div className="card">
              <h3>No quizzes yet</h3>
              <p>Ask your teacher to create a quiz.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
