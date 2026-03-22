"use client";

import { useSession } from "next-auth/react";
import { useGetTopicsQuery, useGetProgressQuery, useGetQuizzesQuery, useGetAttemptsQuery } from "@/store/api";
import Loader from "@/components/Loader";
import Link from "next/link";
import StudentTopicCard from "@/components/StudentTopicCard";

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const userId = session?.user?.email;

  // Fetch all necessary data
  const { data: topicsData, isFetching: topicsLoading } = useGetTopicsQuery();
  const { data: progressData, isFetching: progressLoading } = useGetProgressQuery(userId, { skip: !userId });
  const { data: quizzesData, isFetching: quizzesLoading } = useGetQuizzesQuery("");
  const { data: attemptsData, isFetching: attemptsLoading } = useGetAttemptsQuery({ userId }, { skip: !userId });

  if (status === "loading" || topicsLoading || progressLoading || quizzesLoading || attemptsLoading) {
    return (
      <main className="main">
        <Loader label="Loading your dashboard..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Student Dashboard</h1>
        <p>Please sign in to access your dashboard.</p>
        <div className="cta-row">
          <Link href="/login" className="button primary">Go to Login</Link>
        </div>
      </main>
    );
  }

  const topics = [...(topicsData?.topics || [])].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const progress = progressData?.progress || [];
  const quizzes = quizzesData?.quizzes || [];
  const attempts = attemptsData?.attempts || [];

  // Calculate Stats
  const totalLessonsCompleted = progress.reduce((sum, p) => sum + p.completedLessons, 0);
  const totalQuizzesTaken = attempts.length;
  const avgScore = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length) // Use percentage if score is out of 100
    : 0;
  // Assuming score is % based on existing code, or checking 'percentage' field

  // Helper to find progress for a topic
  const getTopicProgress = (topicId) => progress.find(p => p.topicId?._id === topicId || p.topicId === topicId);

  // Helper to get quizzes for a topic
  const getTopicQuizzes = (topicId) => quizzes.filter(q => q.topicId === topicId || q.topicId?._id === topicId);

  // Helper to get best score for a quiz
  const getBestQuizScore = (quizId) => {
    const quizAttempts = attempts.filter(a => a.quizId?._id === quizId || a.quizId === quizId);
    if (quizAttempts.length === 0) return null;
    return Math.max(...quizAttempts.map(a => a.percentage || 0));
  };

  return (
    <main className="main">
      {/* Welcome Section */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontFamily: "Poppins, sans-serif", color: "#0c1b2a" }}>
          Welcome back, {session.user.name?.split(" ")[0]}!
        </h2>
        <p style={{ color: "#577089", marginTop: 4 }}>
          Ready to continue learning? Here's your progress overview.
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
          <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", fontWeight: 600 }}>Lessons Completed</p>
          <h3 style={{ fontSize: 36, marginTop: 8, color: "#0f172a" }}>{totalLessonsCompleted}</h3>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #9b59b6", padding: "24px" }}>
          <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", fontWeight: 600 }}>Quizzes Taken</p>
          <h3 style={{ fontSize: 36, marginTop: 8, color: "#0f172a" }}>{totalQuizzesTaken}</h3>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #2ecc71", padding: "24px" }}>
          <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", fontWeight: 600 }}>Average Score</p>
          <h3 style={{ fontSize: 36, marginTop: 8, color: "#0f172a" }}>{avgScore}%</h3>
        </div>
      </section>

      {/* Main Content: Topics List */}
      <section>
        <h2 className="section-title">My Subjects</h2>
        <div style={{ display: "grid", gap: 32 }}>
          {topics.map((topic) => {
            const topicProgress = getTopicProgress(topic._id);
            const topicQuizzes = getTopicQuizzes(topic._id);

            return (
              <StudentTopicCard
                key={topic._id}
                topic={topic}
                topicProgress={topicProgress}
                topicQuizzes={topicQuizzes}
                attempts={attempts}
              />
            );
          })}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">Recent Activity</h2>
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap" style={{ margin: 0, border: "none", boxShadow: "none" }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ background: "#f8fafc", padding: 16 }}>Quiz</th>
                  <th style={{ background: "#f8fafc", padding: 16 }}>Date</th>
                  <th style={{ background: "#f8fafc", padding: 16 }}>Score</th>
                  <th style={{ background: "#f8fafc", padding: 16 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attempts.slice(0, 5).map((attempt) => (
                  <tr key={attempt._id}>
                    <td style={{ padding: 16, fontWeight: 600 }}>{attempt.quizId?.title || "Unknown Quiz"}</td>
                    <td style={{ padding: 16, color: "#64748b" }}>{new Date(attempt.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: 16, fontWeight: 700 }}>{attempt.percentage}%</td>
                    <td style={{ padding: 16 }}>
                      <span className="badge" style={{
                        background: attempt.percentage >= 70 ? "#dcfce7" : "#fee2e2",
                        color: attempt.percentage >= 70 ? "#166534" : "#991b1b",
                        fontSize: 11
                      }}>
                        {attempt.percentage >= 70 ? "PASSED" : "NEEDS PRACTICE"}
                      </span>
                    </td>
                  </tr>
                ))}
                {!attempts.length && (
                  <tr><td colSpan="4" style={{ padding: 24, textAlign: "center", color: "#64748b" }}>No recent activity found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
