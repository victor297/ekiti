"use client";

import { useSession } from "next-auth/react";
import { useGetAttemptsQuery, useGetQuizzesQuery, useGetStudentsQuery } from "@/store/api";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function TeacherAttemptsPage() {
  const { data: session, status } = useSession();
  const { data: quizzesData } = useGetQuizzesQuery();
  const { data: studentsData } = useGetStudentsQuery();
  const [quizId, setQuizId] = useState("");
  const [studentId, setStudentId] = useState("");
  const { data: attemptsData, isFetching } = useGetAttemptsQuery({
    quizId: quizId || undefined,
    userId: studentId || undefined
  });

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading attempts..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Attempt History</h1>
        <p>Please sign in to view attempts.</p>
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
        <h1 className="section-title">Attempt History</h1>
        <p>Only teachers can view student attempts.</p>
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
          <span>Attempt History</span>
          <span className="badge">Teacher</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher">
            Back to Dashboard
          </a>
          <a className="button secondary" href="/teacher/students">
            Students
          </a>
        </div>
      </nav>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="hero-card">
          <h2 className="section-title" style={{ marginTop: 0 }}>Filters</h2>
          <div className="form" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <select
              className="input"
              value={quizId}
              onChange={(event) => setQuizId(event.target.value)}
            >
              <option value="">All quizzes</option>
              {(quizzesData?.quizzes || []).map((quiz) => (
                <option key={quiz._id} value={quiz._id}>
                  {quiz.title}
                </option>
              ))}
            </select>
            
            <div>
              <input
                className="input"
                list="students-list"
                placeholder="Search student..."
                value={studentId}
                onChange={(event) => setStudentId(event.target.value)}
                style={{ width: "100%" }}
              />
              <datalist id="students-list">
                {(studentsData?.students || []).map((student) => (
                  <option key={student._id} value={student.email}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <h2 className="section-title" style={{ marginTop: 0 }}>Recent Attempts</h2>
          {isFetching && <Loader label="Refreshing attempts..." />}
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            {(attemptsData?.attempts || []).map((attempt) => (
              <div 
                key={attempt._id}
                style={{
                  background: "#f8fafc",
                  padding: "16px 20px",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12
                }}
              >
                <div>
                  <h3 style={{ fontSize: 16, marginBottom: 4 }}>{attempt.quizId?.title || "Quiz"}</h3>
                  <p style={{ fontSize: 13, color: "#64748b" }}>
                    Student: <span style={{ fontWeight: 600, color: "#334155" }}>{attempt.userId}</span>
                  </p>
                </div>
                
                <div style={{ textAlign: "right", display: "flex", gap: 24, alignItems: "center" }}>
                  <div>
                    <span style={{ 
                      fontSize: 12, 
                      textTransform: "uppercase", 
                      letterSpacing: 0.5, 
                      color: "#64748b",
                      display: "block",
                      marginBottom: 2
                    }}>Score</span>
                    <span style={{ 
                      fontWeight: 700, 
                      color: attempt.percentage >= 70 ? "#10b981" : attempt.percentage >= 50 ? "#f59e0b" : "#ef4444" 
                    }}>
                      {attempt.score}/{attempt.totalPoints} ({attempt.percentage}%)
                    </span>
                  </div>
                  <div>
                    <span style={{ 
                      fontSize: 12, 
                      textTransform: "uppercase", 
                      letterSpacing: 0.5, 
                      color: "#64748b",
                      display: "block",
                      marginBottom: 2
                    }}>Date</span>
                    <span style={{ fontSize: 14, color: "#334155" }}>
                      {new Date(attempt.createdAt).toLocaleDateString()} {new Date(attempt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {!attemptsData?.attempts?.length && (
              <div style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
                <p>No attempts found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
