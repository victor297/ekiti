"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGetTopicsQuery, useUpdateProgressMutation, useGetProgressQuery } from "@/store/api";
import Loader from "@/components/Loader";
import AITutor from "@/components/AITutor";
import toast from "react-hot-toast";
import Week1Interactions from "@/components/Week1Interactions";
import Week2Interactions from "@/components/Week2Interactions";
import Week3Interactions from "@/components/Week3Interactions";
import Week4Interactions from "@/components/Week4Interactions";
import Week5Interactions from "@/components/Week5Interactions";
import Week6Interactions from "@/components/Week6Interactions";
export default function LessonPage() {
  const { id } = useParams(); // This is topicId-lessonIndex format
  const router = useRouter();
  const { data: session } = useSession();
  const { data: topicsData, isFetching } = useGetTopicsQuery();
  const { data: progressData } = useGetProgressQuery(session?.user?.email, { skip: !session?.user?.email });
  const [updateProgress] = useUpdateProgressMutation();
  const [completed, setCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null;

  if (isFetching) {
    return (
      <main className="main">
        <Loader label="Loading lesson..." />
      </main>
    );
  }

  // Parse the id to get topicId and lessonIndex
  const parts = id?.split("-");
  if (!parts || parts.length < 2) {
    return (
      <main className="main">
        <h1 className="section-title">Invalid Lesson</h1>
        <p>The lesson URL is not valid.</p>
        <div className="cta-row">
          <a href="/student" className="button primary">Back to Dashboard</a>
        </div>
      </main>
    );
  }

  const topicId = parts[0];
  const lessonIndex = parseInt(parts[1]);

  const topic = topicsData?.topics?.find((t) => t._id === topicId);
  const lesson = topic?.lessons?.[lessonIndex];

  if (!topic || !lesson) {
    return (
      <main className="main">
        <h1 className="section-title">Lesson Not Found</h1>
        <p>The requested lesson could not be found.</p>
        <div className="cta-row">
          <a href="/student" className="button primary">Back to Dashboard</a>
        </div>
      </main>
    );
  }

  // Progress check
  const currentProgress = progressData?.progress?.find(p =>
    (p.topicId?._id === topicId || p.topicId === topicId)
  );
  const completedCount = currentProgress?.completedLessons || 0;
  const isLocked = lessonIndex > completedCount;

  if (isLocked) {
    return (
      <main className="main">
        <h1 className="section-title">Lesson Locked</h1>
        <p>You need to complete the previous lessons before you can access this one.</p>
        <div className="cta-row">
          <a href={`/topics/${topicId}`} className="button primary">Back to Topic</a>
        </div>
      </main>
    );
  }

  const nextLessonIndex = lessonIndex + 1;
  const hasNextLesson = nextLessonIndex < topic.lessons.length;
  const prevLessonIndex = lessonIndex - 1;
  const hasPrevLesson = lessonIndex > 0;

  const handleMarkComplete = async () => {
    if (!session?.user?.email) {
      toast.error("Please log in to track progress");
      return;
    }

    try {
      // Get current progress for this topic
      const currentProgress = progressData?.progress?.find(p =>
        (p.topicId?._id === topicId || p.topicId === topicId)
      );

      const currentCompletedCount = currentProgress?.completedLessons || 0;
      const newCompletedCount = Math.max(currentCompletedCount, lessonIndex + 1);

      await updateProgress({
        userId: session.user.email,
        topicId: topic._id,
        completedLessons: newCompletedCount
      }).unwrap();

      setCompleted(true);
      toast.success("Lesson marked as complete!");
    } catch (err) {
      console.error("Progress update error:", err);
      toast.error(err?.data?.error || "Failed to update progress");
    }
  };

  const handleSpeak = (fallbackText) => {
    if (!speechSynthesis) {
      toast.error("Text-to-speech is not supported in your browser");
      return;
    }

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let textToRead = fallbackText;
    const contentBox = document.getElementById("readable-content");
    if (contentBox && contentBox.innerText) {
      textToRead = `Lesson: ${lesson.title}. \n ${contentBox.innerText}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast.error("Failed to play audio");
    };

    speechSynthesis.speak(utterance);
  };

  const getLessonText = () => {
    let text = `Lesson: ${lesson.title}. `;

    // Add description
    if (lesson.description) {
      text += lesson.description + ". ";
    }

    // Add text content for text lessons
    if (lesson.type === "text" && lesson.textContent) {
      text += lesson.textContent + ". ";
    }

    // Add type-specific information
    if (lesson.type === "text" && !lesson.textContent) {
      text += "This is a text-based lesson where you can read through the material at your own pace. ";
    } else if (lesson.type === "video") {
      text += "This is a video lesson. Watch the video to learn about this topic. ";
    } else if (lesson.type === "animation") {
      text += "This is an interactive animation lesson. Explore the animation to understand the concepts. ";
    }

    // Add duration
    text += `This lesson takes approximately ${lesson.durationMins} minutes to complete.`;

    return text;
  };

  const handleNext = () => {
    if (hasNextLesson) {
      router.push(`/lessons/${topicId}-${nextLessonIndex}`);
      setCompleted(false);
    } else {
      router.push(`/topics/${topicId}`);
    }
  };

  const handlePrev = () => {
    if (hasPrevLesson) {
      router.push(`/lessons/${topicId}-${prevLessonIndex}`);
      setCompleted(false);
    }
  };

  return (
    <main className="main">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <a
            href={`/topics/${topicId}`}
            style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}
          >
            ← Back to {topic.name}
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 32, fontFamily: "Poppins, sans-serif", marginBottom: 8 }}>
              {lesson.title}
            </h1>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <span className="badge" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                {lesson.type.toUpperCase()}
              </span>
              <span style={{ fontSize: 14, color: "#64748b" }}>
                {lesson.durationMins} minutes
              </span>
              <span style={{ fontSize: 14, color: "#64748b" }}>
                Lesson {lessonIndex + 1} of {topic.lessons.length}
              </span>
            </div>
          </div>

          {/* Text-to-Speech Button */}
          <button
            onClick={() => handleSpeak(getLessonText())}
            className="button secondary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: isSpeaking ? "#fee2e2" : "#f0fdf4",
              color: isSpeaking ? "#991b1b" : "#166534",
              border: `1px solid ${isSpeaking ? "#fecaca" : "#bbf7d0"}`
            }}
          >
            {isSpeaking ? "🔇 Stop Reading" : "🔊 Read Aloud"}
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>Course Progress</span>
          <span style={{ fontSize: 13, color: "#64748b" }}>
            {lessonIndex + 1}/{topic.lessons.length} lessons
          </span>
        </div>
        <div className="progress-bar" style={{ height: 6, background: "#e2e8f0" }}>
          <span style={{
            width: `${((lessonIndex + 1) / topic.lessons.length) * 100}%`,
            background: "#3498db"
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="lesson-container">

        {/* Lesson Content Column */}
        <div>
          <div className="lesson-card" id="readable-content">
            {/* Lesson Description */}
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 24,
              marginBottom: 24
            }}>
              <h3 style={{ fontSize: 18, marginBottom: 12, color: "#0f172a" }}>About This Lesson</h3>
              <p style={{ lineHeight: 1.8, color: "#334155", margin: 0 }}>
                {lesson.description || "No description available for this lesson."}
              </p>
            </div>

            {/* Type-specific content */}
            {lesson.type === "interactive" && lesson.customId && lesson.customId.startsWith("week1") && (
              <div style={{ marginBottom: 24, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                <Week1Interactions customId={lesson.customId} />
              </div>
            )}

            {lesson.type === "interactive" && lesson.customId && lesson.customId.startsWith("week2") && (
              <div style={{ marginBottom: 24, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                <Week2Interactions customId={lesson.customId} />
              </div>
            )}

            {lesson.type === "interactive" && lesson.customId && lesson.customId.startsWith("week3") && (
              <div style={{ marginBottom: 24, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                <Week3Interactions customId={lesson.customId} />
              </div>
            )}

            {lesson.type === "interactive" && lesson.customId && lesson.customId.startsWith("week4") && (
              <div style={{ marginBottom: 24, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                <Week4Interactions customId={lesson.customId} />
              </div>
            )}

            {lesson.type === "interactive" && lesson.customId && lesson.customId.startsWith("week5") && (
              <div style={{ marginBottom: 24, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                <Week5Interactions customId={lesson.customId} />
              </div>
            )}

            {lesson.type === "interactive" && lesson.customId && lesson.customId.startsWith("week6") && (
              <div style={{ marginBottom: 24, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                <Week6Interactions customId={lesson.customId} />
              </div>
            )}

            {(lesson.type === "video" || lesson.type === "animation") && (
              <div style={{ marginBottom: 24 }}>
                <div
                  className="placeholder-card"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: lesson.contentUrl ? 0 : undefined,
                    overflow: "hidden"
                  }}
                >
                  {lesson.contentUrl ? (
                    <div style={{ backgroundColor: "#000", display: "flex", justifyContent: "center" }}>
                      <video
                        src={lesson.contentUrl}
                        controls
                        style={{
                          maxWidth: "100%",
                          maxHeight: "600px",
                          display: "block"
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>
                        {lesson.type === "video" ? "▶" : "🎬"}
                      </div>
                      <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                        {lesson.type === "video" ? "Video Lesson" : "Interactive Animation"}
                      </p>
                      <p style={{ margin: "8px 0 0 0", fontSize: 14, opacity: 0.9 }}>
                        Content coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {lesson.type === "text" && (
              <div style={{ marginBottom: 24 }}>
                {lesson.textContent ? (
                  <div style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "24px"
                  }}>
                    <h3 style={{ fontSize: 20, marginBottom: 16, color: "#0f172a" }}>📖 Lesson Content</h3>
                    <div style={{
                      lineHeight: 1.8,
                      color: "#334155",
                      whiteSpace: "pre-wrap",
                      fontSize: 15
                    }}>
                      {lesson.textContent}
                    </div>
                  </div>
                ) : (
                  <div
                    className="placeholder-card"
                    style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📖</div>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Text Lesson</p>
                    <p style={{ margin: "8px 0 0 0", fontSize: 14, opacity: 0.9 }}>
                      Read through the material at your own pace
                    </p>
                  </div>
                )}
              </div>
            )}

            {lesson.type === "quiz" && (
              <div style={{ marginBottom: 24 }}>
                <div
                  className="placeholder-card"
                  style={{ background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✏️</div>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Quiz</p>
                  <p style={{ margin: "8px 0 0 0", fontSize: 14, opacity: 0.9 }}>
                    Test your understanding of the topic
                  </p>
                </div>
              </div>
            )}

            <div style={{
              background: "#fffbeb",
              border: "1px solid #fef3c7",
              borderRadius: 12,
              padding: 20
            }}>
              <h4 style={{ fontSize: 14, marginBottom: 8, color: "#92400e" }}>💡 Key Takeaways</h4>
              <p style={{ fontSize: 14, color: "#78350f", margin: 0 }}>
                Make sure you understand the concepts before moving to the next lesson.
                You can always come back and review this material. Use the AI Tutor if you need help!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={handlePrev}
                disabled={!hasPrevLesson}
                className="button secondary"
                style={{
                  opacity: hasPrevLesson ? 1 : 0.5,
                  cursor: hasPrevLesson ? "pointer" : "not-allowed",
                  background: "#f8fafc",
                  color: "#334155",
                  border: "1px solid #e2e8f0"
                }}
              >
                &larr; Previous
              </button>

              <button
                onClick={handleMarkComplete}
                disabled={completed}
                className="button secondary"
                style={{
                  background: completed ? "#dcfce7" : "#eef4ff",
                  color: completed ? "#166534" : "#216aa2",
                  cursor: completed ? "default" : "pointer"
                }}
              >
                {completed ? "✓ Completed" : "Mark as Complete"}
              </button>
            </div>

            <button
              onClick={handleNext}
              className="button primary"
              style={{ boxShadow: "0 4px 14px rgba(52, 152, 219, 0.4)" }}
            >
              {hasNextLesson ? "Next Lesson →" : "Complete Course"}
            </button>
          </div>
        </div>

        {/* Sidebar - Lesson List */}
        <div>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>Course Outline</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {topic.lessons.map((l, idx) => {
                const isItemLocked = idx > completedCount;
                
                return (
                  <div key={idx} style={{ position: "relative" }}>
                    <a
                      href={isItemLocked ? "#" : `/lessons/${topicId}-${idx}`}
                      onClick={(e) => isItemLocked && e.preventDefault()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 8,
                        background: idx === lessonIndex ? "#e0f2fe" : "#f8fafc",
                        border: `1px solid ${idx === lessonIndex ? "#0369a1" : "#e2e8f0"}`,
                        textDecoration: "none",
                        color: isItemLocked ? "#94a3b8" : "inherit",
                        transition: "all 0.2s",
                        cursor: isItemLocked ? "not-allowed" : "pointer",
                        opacity: isItemLocked ? 0.7 : 1
                      }}
                    >
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: idx === lessonIndex ? "#0369a1" : (isItemLocked ? "#e2e8f0" : "#cbd5e1"),
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        {isItemLocked ? "🔒" : idx + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 13,
                          fontWeight: idx === lessonIndex ? 600 : 400,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>
                          {l.title}
                        </div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>
                          {isItemLocked ? "Locked" : `${l.durationMins} min`}
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AI Tutor Component */}
      <AITutor
        lessonTitle={lesson.title}
        lessonType={lesson.type}
        lessonContent={lesson.content || getLessonText()}
      />
    </main>
  );
}
