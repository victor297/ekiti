"use client";

import { useSession } from "next-auth/react";
import { useGetStudentQuery } from "@/store/api";
import Loader from "@/components/Loader";

export default function StudentDetailPage({ params }) {
  const { data: session, status } = useSession();
  const { data } = useGetStudentQuery(params.id);

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading student..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Student Details</h1>
        <p>Please sign in to view student details.</p>
        <div className="cta-row">
          <a className="button primary" href="/login">
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  if (session.user.role !== "teacher") {
    return (
      <main className="main">
        <h1 className="section-title">Student Details</h1>
        <p>Only teachers can view student details.</p>
        <div className="cta-row">
          <a className="button primary" href="/">
            Go to Home
          </a>
        </div>
      </main>
    );
  }

  if (!data?.student) {
    return (
      <main className="main">
        <p>Student not found.</p>
      </main>
    );
  }

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>{data.student.name}</span>
          <span className="badge">Student</span>
          <span className="badge" style={{ background: "#f8fafc", color: "#64748b", textTransform: "capitalize" }}>{data.student.gender}</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher/students">
            Back to Students
          </a>
        </div>
      </nav>

      <section>
        <h2 className="section-title">Progress</h2>
        <div className="grid">
          {(data.progress || []).map((item) => (
            <div className="card" key={item._id}>
              <h3>{item.topicId?.name}</h3>
              <p>
                {item.completedLessons}/{item.totalLessons} lessons completed
              </p>
              <div className="progress">
                <div className="progress-bar">
                  <span
                    style={{
                      width: `${
                        item.totalLessons
                          ? (item.completedLessons / item.totalLessons) * 100
                          : 0
                      }%`
                    }}
                  />
                </div>
                <span>{item.score}%</span>
              </div>
            </div>
          ))}
          {!data.progress?.length && (
            <div className="card">
              <h3>No progress yet</h3>
              <p>Student has not completed any quizzes.</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="section-title">Quiz Attempts</h2>
        <div className="grid">
          {(data.attempts || []).map((attempt) => (
            <div className="card" key={attempt._id}>
              <h3>{attempt.quizId?.title || "Quiz"}</h3>
              <p>
                Score: {attempt.score}/{attempt.totalPoints} ({attempt.percentage}%)
              </p>
              <p>Attempted on {new Date(attempt.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {!data.attempts?.length && (
            <div className="card">
              <h3>No attempts yet</h3>
              <p>Student has not taken a quiz yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
