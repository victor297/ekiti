"use client";

import { useSession } from "next-auth/react";
import { useGetAttemptsQuery, useGetProgressQuery } from "@/store/api";
import Loader from "@/components/Loader";

export default function StudentProgressPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.email;
  const { data: progressData } = useGetProgressQuery(userId, {
    skip: !userId
  });
  const { data: attemptsData } = useGetAttemptsQuery(undefined, {
    skip: !userId
  });

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading progress..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">My Progress</h1>
        <p>Please sign in to view your progress.</p>
        <div className="cta-row">
          <a className="button primary" href="/">
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>My Progress</span>
          <span className="badge">Student</span>
        </div>
      </nav>

      <section>
        <h2 className="section-title">Topic Progress</h2>
        <div className="grid">
          {(progressData?.progress || []).map((item) => (
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
          {!progressData?.progress?.length && (
            <div className="card">
              <h3>No progress yet</h3>
              <p>Complete a quiz to start tracking your progress.</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="section-title">Recent Attempts</h2>
        <div className="grid">
          {(attemptsData?.attempts || []).map((attempt) => (
            <div className="card" key={attempt._id}>
              <h3>{attempt.quizId?.title || "Quiz"}</h3>
              <p>
                Score: {attempt.score}/{attempt.totalPoints} ({attempt.percentage}%)
              </p>
              <p>Attempted on {new Date(attempt.createdAt).toLocaleString()}</p>
            </div>
          ))}
          {!attemptsData?.attempts?.length && (
            <div className="card">
              <h3>No attempts yet</h3>
              <p>Take a quiz to see your attempt history.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
