"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetTopicsQuery, useUpdateTopicMutation } from "@/store/api";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Loader from "@/components/Loader";

export default function EditTopicPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: topicsData, isFetching } = useGetTopicsQuery();
  const [updateTopic, { isLoading }] = useUpdateTopicMutation();
  const { register, handleSubmit, setValue } = useForm();

  const topic = topicsData?.topics?.find(t => t._id === id);

  // Set form values when topic loads
  useEffect(() => {
    if (topic) {
      setValue("name", topic.name);
      setValue("level", topic.level);
      setValue("summary", topic.summary);
    }
  }, [topic, setValue]);

  const onSubmit = async (values) => {
    try {
      await updateTopic({
        topicId: id,
        ...values
      }).unwrap();
      toast.success("Topic updated successfully!");
      router.push("/teacher/lessons");
    } catch (err) {
      toast.error(err?.data?.error || "Failed to update topic");
    }
  };

  if (status === "loading" || isFetching) {
    return (
      <main className="main">
        <Loader label="Loading topic..." />
      </main>
    );
  }

  if (!session || session.user.role !== "teacher") {
    return (
      <main className="main">
        <h1 className="section-title">Access Denied</h1>
        <p>Only teachers can edit topics.</p>
        <div className="cta-row">
          <a className="button primary" href="/teacher">Back to Dashboard</a>
        </div>
      </main>
    );
  }

  if (!topic) {
    return (
      <main className="main">
        <h1 className="section-title">Topic Not Found</h1>
        <p>The topic you're looking for doesn't exist.</p>
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
          <span>Edit Topic</span>
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
          <h2 className="section-title">Edit Topic: {topic.name}</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                Topic Name
              </label>
              <input
                className="input"
                placeholder="e.g., Statistics"
                defaultValue={topic.name}
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                Level
              </label>
              <input
                className="input"
                placeholder="e.g., JSS 2"
                defaultValue={topic.level}
                {...register("level")}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                Summary
              </label>
              <textarea
                className="input"
                rows="4"
                placeholder="Brief description of this topic"
                defaultValue={topic.summary}
                {...register("summary")}
              />
            </div>

            <div style={{ 
              background: "#f8fafc", 
              padding: 16, 
              borderRadius: 8,
              border: "1px solid #e2e8f0"
            }}>
              <h4 style={{ fontSize: 14, marginBottom: 8 }}>Current Lessons</h4>
              {topic.lessons.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {topic.lessons.map((lesson, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>
                      {lesson.title} ({lesson.type})
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>No lessons yet</p>
              )}
            </div>

            <button className="button primary" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
