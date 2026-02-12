"use client";

import { useSession } from "next-auth/react";
import { useGetTopicsQuery } from "@/store/api";
import Loader from "@/components/Loader";

export default function TeacherLessonsPage() {
  const { data: session, status } = useSession();
  const { data: topicsData, isFetching } = useGetTopicsQuery();

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading lessons..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Lessons</h1>
        <p>Please sign in to view lessons.</p>
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
        <h1 className="section-title">Lessons</h1>
        <p>Only teachers can view lessons.</p>
        <div className="cta-row">
          <a className="button primary" href="/">
            Go to Home
          </a>
        </div>
      </main>
    );
  }

  const topics = topicsData?.topics || [];

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>Lessons</span>
          <span className="badge">Teacher</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher/lessons/new">
            Create Lesson
          </a>
        </div>
      </nav>

      <section>
        <h2 className="section-title">Subjects & Lessons</h2>
        {isFetching && <Loader label="Loading topics..." />}
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Lesson Title</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <>
                  {topic.lessons.length > 0 ? (
                    topic.lessons.map((lesson, idx) => (
                      <tr key={`${topic._id}-${idx}`}>
                        <td style={{ fontWeight: 600 }}>
                          {idx === 0 ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              {topic.name}
                              <a
                                href={`/teacher/topics/${topic._id}`}
                                className="button secondary"
                                style={{ padding: "4px 8px", fontSize: 11 }}
                                title="Edit topic"
                              >
                                ✏️
                              </a>
                            </div>
                          ) : ""}
                        </td>
                        <td>{lesson.title}</td>
                        <td>
                          <span className="badge" style={{ fontSize: 10 }}>
                            {lesson.type}
                          </span>
                        </td>
                        <td>{lesson.durationMins} mins</td>
                        <td>
                          <a 
                            href={`/teacher/lessons/edit/${topic._id}/${idx}`}
                            className="button secondary" 
                            style={{ padding: "6px 12px", fontSize: 12 }}
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={topic._id}>
                      <td style={{ fontWeight: 600 }}>{topic.name}</td>
                      <td colSpan="3" style={{ color: "#888", fontStyle: "italic" }}>
                        No lessons available
                      </td>
                      <td>
                        <a 
                          href={`/teacher/lessons/new?topicId=${topic._id}`}
                          className="button secondary" 
                          style={{ padding: "6px 12px", fontSize: 12 }}
                        >
                           Add Lesson
                        </a>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {!topics.length && !isFetching && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
