"use client";

import { useGetTopicsQuery } from "@/store/api";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading } = useGetTopicsQuery();

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Navigation */}
      <nav style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: 18
            }}>M</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Math Explorer</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link href="/login" className="button secondary">Login</Link>
            <Link href="/signup" className="button primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "80px 24px"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{
            fontSize: 56,
            fontWeight: 800,
            marginBottom: 24,
            lineHeight: 1.2,
            fontFamily: "Poppins, sans-serif"
          }}>
            Master Mathematics with<br />Interactive Learning
          </h1>
          <p style={{
            fontSize: 20,
            marginBottom: 40,
            opacity: 0.95,
            maxWidth: 700,
            margin: "0 auto 40px"
          }}>
            Engaging video lessons, interactive quizzes, and real-time progress tracking. 
            Built for JSS 2 students to excel in Statistics, Algebra, and more.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link 
              href="/signup" 
              className="button primary"
              style={{
                background: "white",
                color: "#667eea",
                fontSize: 16,
                padding: "14px 32px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
              }}
            >
              Start Learning Free
            </Link>
            <a 
              href="#topics" 
              className="button secondary"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "2px solid white",
                fontSize: 16,
                padding: "14px 32px"
              }}
            >
              Explore Topics
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 16,
            color: "#0f172a"
          }}>
            Why Students Love Math Explorer
          </h2>
          <p style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: 18,
            marginBottom: 48,
            maxWidth: 600,
            margin: "0 auto 48px"
          }}>
            Everything you need to succeed in mathematics, all in one place
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32
          }}>
            {[
              {
                icon: "🎥",
                title: "Video Lessons",
                description: "Short, engaging videos that break down complex concepts into easy-to-understand segments"
              },
              {
                icon: "✏️",
                title: "Interactive Quizzes",
                description: "Test your knowledge with instant feedback and detailed explanations for every question"
              },
              {
                icon: "📊",
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed analytics and performance insights"
              },
              {
                icon: "🎯",
                title: "Personalized Learning",
                description: "Pick up right where you left off and learn at your own pace, anytime, anywhere"
              },
              {
                icon: "👨‍🏫",
                title: "Teacher Dashboard",
                description: "Educators can create content, track student progress, and manage assessments"
              },
              {
                icon: "🏆",
                title: "Achievement System",
                description: "Earn badges and track milestones as you complete lessons and ace quizzes"
              }
            ].map((feature, idx) => (
              <div key={idx} className="card" style={{
                padding: 32,
                textAlign: "center",
                transition: "transform 0.2s",
                cursor: "default"
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{feature.icon}</div>
                <h3 style={{ fontSize: 20, marginBottom: 12, color: "#0f172a" }}>{feature.title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 16,
            color: "#0f172a"
          }}>
            Available Topics
          </h2>
          <p style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: 18,
            marginBottom: 48
          }}>
            Start with Statistics and Algebra, then unlock more subjects
          </p>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <div className="spinner" />
              <p style={{ marginTop: 16, color: "#64748b" }}>Loading topics...</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24
            }}>
              {data?.topics?.map((topic, index) => (
                <div
                  key={topic._id}
                  className="card"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                  }}
                >
                  <div style={{
                    height: 140,
                    background: `linear-gradient(135deg, ${["#667eea", "#f093fb", "#4facfe", "#43e97b"][index % 4]} 0%, ${["#764ba2", "#f5576c", "#00f2fe", "#38f9d7"][index % 4]} 100%)`,
                    margin: "-20px -20px 20px -20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 48
                  }}>
                    {["📊", "🔢", "📐", "🎯"][index % 4]}
                  </div>
                  <h3 style={{ fontSize: 22, marginBottom: 12 }}>{topic.name}</h3>
                  <p style={{ color: "#64748b", flex: 1, marginBottom: 16 }}>{topic.summary}</p>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 16,
                    borderTop: "1px solid #e2e8f0"
                  }}>
                    <span style={{ fontSize: 14, color: "#64748b" }}>
                      {topic.lessons?.length || 0} lessons
                    </span>
                    <Link
                      href="/signup"
                      className="button secondary"
                      style={{ padding: "8px 16px", fontSize: 14 }}
                    >
                      Start Learning →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "80px 24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 42,
            fontWeight: 700,
            marginBottom: 24,
            fontFamily: "Poppins, sans-serif"
          }}>
            Ready to Excel in Mathematics?
          </h2>
          <p style={{ fontSize: 18, marginBottom: 40, opacity: 0.95 }}>
            Join thousands of students already improving their math skills. Get started today for free!
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/signup"
              className="button primary"
              style={{
                background: "white",
                color: "#667eea",
                fontSize: 16,
                padding: "14px 32px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
              }}
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="button secondary"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "2px solid white",
                fontSize: 16,
                padding: "14px 32px"
              }}
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#0f172a",
        color: "white",
        padding: "40px 24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ opacity: 0.7 }}>
            © 2026 Math Explorer. Built for JSS 2 Students.
          </p>
        </div>
      </footer>
    </main>
  );
}
