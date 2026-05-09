"use client";

import { useGetTopicsQuery, useGetProgressQuery } from "@/store/api";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TopicPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const { data: topicsData, isFetching } = useGetTopicsQuery();
  const { data: progressData } = useGetProgressQuery(session?.user?.email, { skip: !session?.user?.email });

  if (isFetching) {
    return (
      <main className="main">
        <Loader label="Loading topic..." />
      </main>
    );
  }

  const topic = topicsData?.topics?.find((t) => t._id === id);

  if (!topic) {
    return (
      <main className="main">
        <h1 className="section-title">Topic Not Found</h1>
        <p>Return to home to select a valid topic.</p>
        <div className="cta-row">
          <a className="button primary" href="/">
            Go Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <section className="hero">
        <div className="hero-card">
          <h1>{topic.name}</h1>
          <p>{topic.summary}</p>
          <div className="cta-row">
             <a href="/student" className="button secondary">Back to Dashboard</a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">Lessons</h2>
        <div className="grid">
          {topic.lessons.map((lesson, index) => {
            const currentProgress = progressData?.progress?.find(p => 
              (p.topicId?._id === id || p.topicId === id)
            );
            const completedCount = currentProgress?.completedLessons || 0;
            const isLocked = index > completedCount;

            return (
              <div 
                className="card" 
                key={index} 
                style={{ 
                  position: "relative", 
                  overflow: "hidden", 
                  display: "flex", 
                  flexDirection: "column",
                  opacity: isLocked ? 0.7 : 1,
                  filter: isLocked ? "grayscale(0.5)" : "none"
                }}
              >
                {/* Background placeholder */}
                <div style={{
                    height: 100,
                    background: isLocked 
                      ? "#cbd5e1" 
                      : `linear-gradient(135deg, ${["#a1c4fd", "#ff9a9e", "#fbc2eb", "#a6c0fe"][index % 4]} 0%, ${["#c2e9fb", "#fecfef", "#a6c1ee", "#f68084"][index % 4]} 100%)`,
                    margin: "-20px -20px 15px -20px"
                }} />
                
                {isLocked && (
                  <div style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "rgba(15, 23, 42, 0.8)",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4
                  }}>
                    <span>🔒 LOCKED</span>
                  </div>
                )}

                <h3>{lesson.title}</h3>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 8, flex: 1 }}>
                   {lesson.type.toUpperCase()} • {lesson.durationMins} mins
                </p>
                
                <div className="cta-row" style={{ marginTop: "auto" }}>
                  {isLocked ? (
                    <button 
                      className="button secondary" 
                      disabled
                      style={{ width: "100%", justifyContent: "center", cursor: "not-allowed" }}
                    >
                      Locked
                    </button>
                  ) : (
                    <a 
                      href={`/lessons/${topic._id}-${index}`}
                      className="button primary" 
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      {index < completedCount ? "Review Lesson" : "Start Lesson"}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
          {!topic.lessons.length && (
            <p>No lessons available for this topic yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
