"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "teacher") {
        router.replace("/teacher");
      } else {
        router.replace("/student");
      }
    }
  }, [status, session, router]);

  const onLogin = async (values) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    });

    if (res?.ok) {
      toast.success("Welcome back!");
    } else {
      toast.error(res?.error || "Invalid email or password. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <main className="main" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" />
      </main>
    );
  }

  if (status === "authenticated") {
    return (
      <main className="main" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Redirecting to your dashboard...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo/Brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: 24
            }}>M</div>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>Math Explorer</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="card" style={{ padding: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
            Welcome Back
          </h1>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: 32 }}>
            Sign in to continue your learning journey
          </p>

          <form className="form" onSubmit={handleSubmit(onLogin)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>
                Email Address
              </label>
              <input
                className="input"
                placeholder="student@example.com"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                style={{ width: "100%" }}
              />
              {errors.email && (
                <p style={{ color: "#ef4444", fontSize: 13, marginTop: 4 }}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 600, color: "#334155" }}>
                Password
              </label>
              <input
                className="input"
                placeholder="Enter your password"
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                style={{ width: "100%" }}
              />
              {errors.password && (
                <p style={{ color: "#ef4444", fontSize: 13, marginTop: 4 }}>{errors.password.message}</p>
              )}
            </div>

            <button 
              className="button primary" 
              type="submit"
              style={{ 
                width: "100%", 
                justifyContent: "center",
                padding: "12px",
                fontSize: 16,
                marginTop: 8
              }}
            >
              Sign In
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: 14 }}>
              Don't have an account?{" "}
              <Link href="/signup" style={{ color: "#667eea", fontWeight: 600, textDecoration: "none" }}>
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" style={{ color: "#64748b", fontSize: 14, textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
