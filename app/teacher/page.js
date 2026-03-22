"use client";

import { useSession, signOut } from "next-auth/react";
import { useGetTopicsQuery, useGetProgressQuery, useGetStudentsQuery } from "@/store/api";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const [studentId, setStudentId] = useState("student@jss2math.local");
  const { data: topicsData } = useGetTopicsQuery();
  const { data: studentsData, isFetching: studentsLoading } = useGetStudentsQuery();
  const { data: progressData } = useGetProgressQuery(studentId, {
    skip: !studentId
  });

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading dashboard..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Teacher Dashboard</h1>
        <p>Please sign in on the home page to access teacher tools.</p>
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
        <h1 className="section-title">Teacher Dashboard</h1>
        <p>Access restricted to teacher accounts.</p>
        <div className="cta-row">
          <a className="button primary" href="/">
            Go to Home
          </a>
        </div>
      </main>
    );
  }

  const topics = [...(topicsData?.topics || [])].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const students = studentsData?.students || [];
  const totalLessons = topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const bestStudent = students.length
    ? students.reduce((best, current) => {
      if (!best || current.avgScore > best.avgScore) return current;
      return best;
    }, null)
    : null;
  const totalStudents = students.length;

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>Teacher Dashboard</span>
          <span className="badge">{session.user.role}</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher/lessons/new">
            Create Lesson
          </a>
          <a className="button secondary" href="/teacher/quizzes">
            Quiz Editor
          </a>
          <a className="button secondary" href="/teacher/attempts">
            Attempt History
          </a>
          <a className="button secondary" href="/teacher/students">
            Students
          </a>
        </div>
      </nav>

      {/* Welcome Section */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontFamily: "Poppins, sans-serif", color: "#0c1b2a" }}>
          Welcome back, {session.user.name}
        </h2>
        <p style={{ color: "#577089", marginTop: 4 }}>
          Track your students' progress and manage your curriculum effectively.
        </p>
      </section>

      {/* Stats Row */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          marginBottom: 40
        }}
      >
        <div className="card" style={{ borderLeft: "4px solid #3498db", padding: "24px" }}>
          <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", fontWeight: 600 }}>Active Topics</p>
          <h3 style={{ fontSize: 36, marginTop: 8, color: "#0f172a" }}>{topics.length}</h3>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #2ecc71", padding: "24px" }}>
          <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", fontWeight: 600 }}>Total Lessons</p>
          <h3 style={{ fontSize: 36, marginTop: 8, color: "#0f172a" }}>{totalLessons}</h3>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #f1c40f", padding: "24px" }}>
          <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", fontWeight: 600 }}>Total Students</p>
          <h3 style={{ fontSize: 36, marginTop: 8, color: "#0f172a" }}>{totalStudents}</h3>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #9b59b6", padding: "24px" }}>
          <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", fontWeight: 600 }}>Top Performer</p>
          <h3 style={{ fontSize: 24, marginTop: 14, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {bestStudent ? bestStudent.name.split(" ")[0] : "N/A"}
          </h3>
          {bestStudent && <p style={{ fontSize: 12, color: "#27ae60" }}>{bestStudent.avgScore}% Avg Score</p>}
        </div>
      </section>

      {/* Student Progress Section */}
      <section className="card" style={{ padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h3 style={{ fontSize: 20 }}>Student Performance Tracker</h3>
            <p style={{ color: "#64748b", fontSize: 14 }}>Monitor individual student progress across all topics.</p>
          </div>
          <div className="form" style={{ marginTop: 0, width: "100%", maxWidth: 320 }}>
            <input
              className="input"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              placeholder="Search by student email..."
              type="email"
              style={{ padding: "12px 16px", borderColor: "#e2e8f0" }}
            />
          </div>
        </div>

        {studentsLoading && <Loader label="Loading student stats..." />}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {(progressData?.progress || []).map((item) => (
            <div key={item._id} style={{
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              background: "#f8fafc"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <h4 style={{ fontWeight: 600, color: "#334155" }}>{item.topicId?.name}</h4>
                <span style={{ fontWeight: 700, color: item.score >= 70 ? "#27ae60" : "#d35400" }}>
                  {item.score}%
                </span>
              </div>

              <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b" }}>
                <span>Progress</span>
                <span>{item.completedLessons}/{item.totalLessons} lessons</span>
              </div>

              <div className="progress-bar" style={{ height: 6, background: "#e2e8f0" }}>
                <span
                  style={{
                    width: `${item.totalLessons
                        ? (item.completedLessons / item.totalLessons) * 100
                        : 0
                      }%`,
                    background: item.completedLessons === item.totalLessons ? "#2ecc71" : "#3498db"
                  }}
                />
              </div>
            </div>
          ))}

          {!progressData?.progress?.length && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40, color: "#64748b" }}>
              <p>No progress data found for this student.</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Try entering a different email or ask students to complete quizzes.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
