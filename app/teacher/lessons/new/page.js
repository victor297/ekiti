"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddLessonMutation, useGetQuizzesQuery, useGetTopicsQuery } from "@/store/api";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

function NewLessonContent() {
  const searchParams = useSearchParams();
  const preselectedTopicId = searchParams.get("topicId");
  
  const { data: session, status } = useSession();
  const { data: topicsData, isFetching: topicsLoading } = useGetTopicsQuery();
  const { data: quizzesData, isFetching: quizzesLoading } = useGetQuizzesQuery();
  const [addLesson, { isLoading }] = useAddLessonMutation();
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      type: "video",
      topicId: preselectedTopicId || ""
    }
  });

  // Pre-select topic if provided in URL
  useEffect(() => {
    if (preselectedTopicId) {
      setValue("topicId", preselectedTopicId);
    }
  }, [preselectedTopicId, setValue]);

  const topicId = watch("topicId");
  const lessonType = watch("type");

  const uploadFile = async (file) => {
    setUploading(true);
    try {
      const signatureRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "jss2-math/lessons" })
      });

      const signatureData = await signatureRes.json();
      if (!signatureRes.ok) {
        throw new Error(signatureData.error || "Unable to sign upload.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const cloudData = await cloudRes.json();
      if (!cloudRes.ok) {
        throw new Error(cloudData.error?.message || "Upload failed.");
      }

      setValue("contentUrl", cloudData.secure_url);
      toast.success("Upload complete.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values) => {
    if (!values.topicId) {
      toast.error("Select a topic first.");
      return;
    }

    try {
      const lessonData = {
        topicId: values.topicId,
        title: values.title,
        type: values.type,
        description: values.description,
        durationMins: values.durationMins
      };

      // Add textContent for text lessons
      if (values.type === "text" && values.textContent) {
        lessonData.textContent = values.textContent;
      }

      // Add contentUrl for video/animation/file-based lessons
      if (values.contentUrl) {
        lessonData.contentUrl = values.contentUrl;
      }

      await addLesson(lessonData).unwrap();
      toast.success("Lesson created.");
      reset({ type: values.type });
    } catch (err) {
      toast.error(err?.data?.error || "Could not save lesson.");
    }
  };

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading lesson builder..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Create Lesson</h1>
        <p>Please sign in to create lessons.</p>
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
        <h1 className="section-title">Create Lesson</h1>
        <p>Only teachers can create lessons.</p>
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
          <span>Create Lesson</span>
          <span className="badge">{session.user.role}</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher">
            Back to Dashboard
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-card">
          <h2 className="section-title">Lesson Builder</h2>
          <p>Upload videos/animations or link existing content.</p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {topicsLoading && <Loader label="Loading topics..." />}
            <select className="input" {...register("topicId", { required: true })}>
              <option value="">Select topic</option>
              {(topicsData?.topics || []).map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Lesson title"
              {...register("title", { required: true })}
            />
            <select className="input" {...register("type", { required: true })}>
              <option value="video">Video</option>
              <option value="animation">Animation</option>
              <option value="text">Text</option>
              <option value="quiz">Quiz</option>
            </select>
            {quizzesLoading && <Loader label="Loading quizzes..." />}
            <select className="input" {...register("quizId")}>
              <option value="">Link a quiz (optional)</option>
              {(quizzesData?.quizzes || []).map((quiz) => (
                <option key={quiz._id} value={quiz._id}>
                  {quiz.title}
                </option>
              ))}
            </select>
            <textarea
              className="input"
              rows="4"
              placeholder="Short description"
              {...register("description")}
            />

            {/* Text Content Editor - Only for text lessons */}
            {lessonType === "text" && (
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#334155" }}>
                  Lesson Content
                </label>
                <textarea
                  className="input"
                  rows="12"
                  placeholder="Enter the full text content for this lesson. You can include explanations, examples, and step-by-step instructions..."
                  {...register("textContent")}
                  style={{ fontFamily: "monospace", fontSize: 14 }}
                />
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                  💡 This content will be displayed to students and read aloud by the text-to-speech feature.
                </p>
              </div>
            )}

            {/* URL/File Upload - For video, animation, or attachments */}
            {(lessonType === "video" || lessonType === "animation" || lessonType === "text") && (
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#334155" }}>
                  {lessonType === "text" ? "Attachment (Optional)" : "Content URL or File"}
                </label>
                <input
                  className="input"
                  placeholder={
                    lessonType === "video" 
                      ? "Video URL (YouTube, Vimeo, etc.) or upload file below" 
                      : lessonType === "animation"
                      ? "Animation URL or upload file below"
                      : "Attach a PDF, document, or image (optional)"
                  }
                  {...register("contentUrl")}
                />
                <div style={{ marginTop: 12 }}>
                  <label 
                    style={{ 
                      display: "inline-block",
                      padding: "10px 16px",
                      background: "#f1f5f9",
                      border: "2px dashed #cbd5e1",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#475569"
                    }}
                  >
                    📎 Upload File
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept={
                        lessonType === "video" ? "video/*" :
                        lessonType === "animation" ? "video/*,application/*" :
                        "*"
                      }
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) uploadFile(file);
                      }}
                    />
                  </label>
                  {uploading && <span style={{ marginLeft: 12, color: "#3498db" }}>Uploading...</span>}
                </div>
              </div>
            )}

            <input
              className="input"
              type="number"
              min="0"
              placeholder="Duration in minutes"
              {...register("durationMins")}
            />

            <button className="button primary" type="submit" disabled={isLoading || uploading}>
              {isLoading ? "Saving..." : "Create Lesson"}
            </button>
          </form>
        </div>
        <div className="hero-card">
          <h2 className="section-title">Tips</h2>
          <div className="grid">
            <div className="card">
              <h3>Video + Animation</h3>
              <p>Keep lessons short (6-12 mins) for JSS 2 attention span.</p>
            </div>
            <div className="card">
              <h3>Quiz</h3>
              <p>End with 3-5 questions and immediate feedback.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function NewLessonPage() {
  return (
    <Suspense fallback={<Loader label="Loading lesson builder..." />}>
      <NewLessonContent />
    </Suspense>
  );
}
