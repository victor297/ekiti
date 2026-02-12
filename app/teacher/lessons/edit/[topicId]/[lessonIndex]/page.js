"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetTopicsQuery, useGetQuizzesQuery, useUpdateLessonMutation } from "@/store/api";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Loader from "@/components/Loader";

export default function EditLessonPage() {
  const { topicId, lessonIndex } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: topicsData, isFetching } = useGetTopicsQuery();
  const { data: quizzesData } = useGetQuizzesQuery();
  const [updateLesson, { isLoading }] = useUpdateLessonMutation();
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();

  const lessonType = watch("type");
  const topic = topicsData?.topics?.find(t => t._id === topicId);
  const lesson = topic?.lessons?.[parseInt(lessonIndex)];

  useEffect(() => {
    if (lesson) {
      setValue("title", lesson.title);
      setValue("type", lesson.type);
      setValue("description", lesson.description);
      setValue("textContent", lesson.textContent);
      setValue("contentUrl", lesson.contentUrl);
      setValue("durationMins", lesson.durationMins);
      setValue("quizId", lesson.quizId);
    }
  }, [lesson, setValue]);

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
    try {
      await updateLesson({
        topicId,
        lessonIndex,
        title: values.title,
        type: values.type,
        description: values.description || "",
        textContent: values.textContent || "",
        contentUrl: values.contentUrl || "",
        durationMins: parseInt(values.durationMins) || 0,
        quizId: values.quizId || null
      }).unwrap();
      
      toast.success("Lesson updated successfully!");
      router.push("/teacher/lessons");
    } catch (err) {
      toast.error(err?.data?.error || "Failed to update lesson");
    }
  };

  if (status === "loading" || isFetching) {
    return (
      <main className="main">
        <Loader label="Loading lesson..." />
      </main>
    );
  }

  if (!session || session.user.role !== "teacher") {
    return (
      <main className="main">
        <h1 className="section-title">Access Denied</h1>
        <p>Only teachers can edit lessons.</p>
        <div className="cta-row">
          <a className="button primary" href="/teacher">Back to Dashboard</a>
        </div>
      </main>
    );
  }

  if (!topic || !lesson) {
    return (
      <main className="main">
        <h1 className="section-title">Lesson Not Found</h1>
        <p>The lesson you're looking for doesn't exist.</p>
        <div className="cta-row">
          <a className="button primary" href="/teacher/lessons">Back to Lessons</a>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <nav className="nav">
        <div className="brand">
          <span>Edit Lesson</span>
          <span className="badge">Teacher</span>
        </div>
        <div className="cta-row">
          <a className="button secondary" href="/teacher/lessons">
            Cancel
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-card">
          <h2 className="section-title">Edit Lesson: {lesson.title}</h2>
          <p style={{ marginBottom: 24, color: "#64748b" }}>
            Topic: <strong>{topic.name}</strong>
          </p>
          
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Enter the full text content for this lesson..."
                  {...register("textContent")}
                  style={{ fontFamily: "monospace", fontSize: 14 }}
                />
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                  💡 This content will be displayed to students and read aloud by text-to-speech.
                </p>
              </div>
            )}

            {/* URL/File Upload */}
            {(lessonType === "video" || lessonType === "animation" || lessonType === "text") && (
              <div style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#334155" }}>
                  {lessonType === "text" ? "Attachment (Optional)" : "Content URL or File"}
                </label>
                <input
                  className="input"
                  placeholder={
                    lessonType === "video" 
                      ? "Video URL or upload file below" 
                      : lessonType === "animation"
                      ? "Animation URL or upload file below"
                      : "Attach a file (optional)"
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

            <button className="button primary" type="submit" disabled={uploading}>
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
