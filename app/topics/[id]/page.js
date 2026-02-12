"use client";

import { useGetTopicsQuery } from "@/store/api";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";

export default function TopicPage() {
  const { id } = useParams();
  const { data: topicsData, isFetching } = useGetTopicsQuery();

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
          {topic.lessons.map((lesson, index) => (
            <div className="card" key={index} style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
               {/* Background placeholder per user request "bg placeholder fr the card" */}
              <div style={{
                  height: 100,
                  background: `linear-gradient(135deg, ${["#a1c4fd", "#ff9a9e", "#fbc2eb", "#a6c0fe"][index % 4]} 0%, ${["#c2e9fb", "#fecfef", "#a6c1ee", "#f68084"][index % 4]} 100%)`,
                  margin: "-20px -20px 15px -20px"
              }} />
              <h3>{lesson.title}</h3>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 8, flex: 1 }}>
                 {lesson.type.toUpperCase()} • {lesson.durationMins} mins
              </p>
              
              <div className="cta-row" style={{ marginTop: "auto" }}>
                <a 
                  href={`/lessons/${topic._id}-${index}`}
                  className="button primary" 
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Start Lesson
                </a>
              </div>
            </div>
          ))}
          {!topic.lessons.length && (
            <p>No lessons available for this topic yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
