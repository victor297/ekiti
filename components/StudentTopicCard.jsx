"use client";

import { useState } from "react";
import Link from "next/link";

export default function StudentTopicCard({ topic, topicProgress, topicQuizzes, attempts }) {
  const [expanded, setExpanded] = useState(false);

  // Helper to get best score for a quiz from the attempts prop
  const getBestQuizScore = (quizId) => {
    const quizAttempts = attempts.filter(
      (a) => a.quizId?._id === quizId || a.quizId === quizId
    );
    if (quizAttempts.length === 0) return null;
    return Math.max(...quizAttempts.map((a) => a.percentage || 0));
  };


  const percentComplete =
    topic.lessons.length > 0
      ? ((topicProgress?.completedLessons || 0) / topic.lessons.length) * 100
      : 0;

  const visibleLessons = expanded ? topic.lessons : topic.lessons.slice(0, 3);
  const remainingLessons = topic.lessons.length - 3;

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          padding: 24,
          borderBottom: expanded ? "1px solid #f1f5f9" : "none",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 20, marginBottom: 4 }}>{topic.name}</h3>
            <p style={{ fontSize: 14, color: "#64748b" }}>{topic.summary}</p>
          </div>
          <Link href={`/topics/${topic._id}`} className="button primary">
            Continue Learning
          </Link>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 16,
          }}
        >
          <div
            className="progress-bar"
            style={{ height: 8, background: "#e2e8f0", flex: 1 }}
          >
            <span
              style={{ width: `${percentComplete}%`, background: "#3498db" }}
            />
          </div>
          <span
            style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}
          >
            {Math.round(percentComplete)}% Complete
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: 16,
            background: "none",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            color: "#475569",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.2s"
          }}
        >
          {expanded ? "Hide Details" : "View Lessons & Quizzes"}
          <span style={{ fontSize: 10 }}>{expanded ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Collapsible Details Section */}
      {expanded && (
        <div style={{ padding: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
            }}
          >
            {/* Lessons Column */}
            <div>
              <h4
                style={{
                  fontSize: 14,
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                Lessons
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {topic.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#e0f2fe",
                        color: "#0369a1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span>{lesson.title}</span>
                  </div>
                ))}
                
                {topic.lessons.length === 0 && (
                  <p style={{ fontSize: 13, color: "#94a3b8" }}>No lessons yet.</p>
                )}
              </div>
            </div>

            {/* Quizzes Column */}
            <div>
              <h4
                style={{
                  fontSize: 14,
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                Quizzes
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {topicQuizzes.map((quiz) => {
                  const bestScore = getBestQuizScore(quiz._id);
                  return (
                    <div
                      key={quiz._id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#fff",
                        border: "1px solid #e2e8f0",
                        padding: "10px 14px",
                        borderRadius: 8,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          {quiz.title}
                        </span>
                        {bestScore !== null ? (
                          <span
                            style={{
                              fontSize: 11,
                              color: "#16a34a",
                              fontWeight: 600,
                            }}
                          >
                            Best Score: {bestScore}%
                          </span>
                        ) : (
                          <span style={{ fontSize: 11, color: "#94a3b8" }}>
                            Not taken yet
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/quizzes/${quiz._id}`}
                        className="button secondary"
                        style={{ padding: "6px 12px", fontSize: 12 }}
                      >
                        {bestScore !== null ? "Retake" : "Start"}
                      </Link>
                    </div>
                  );
                })}
                {topicQuizzes.length === 0 && (
                  <p style={{ fontSize: 13, color: "#94a3b8" }}>
                    No quizzes assigned yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
