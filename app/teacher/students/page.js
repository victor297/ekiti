"use client";

import { useSession } from "next-auth/react";
import { useCreateInviteMutation, useGetInvitesQuery, useGetStudentsQuery, useUpdateStudentMutation } from "@/store/api";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function TeacherStudentsPage() {
  const { data: session, status } = useSession();
  const { data: studentsData, isFetching } = useGetStudentsQuery();
  const { data: invitesData } = useGetInvitesQuery();
  const [createInvite, { isLoading }] = useCreateInviteMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const handleInvite = async () => {
    try {
      const res = await createInvite().unwrap();
      toast.success(`Invite token created: ${res.invite.token}`);
    } catch (err) {
      toast.error(err?.data?.error || "Could not create invite.");
    }
  };

  if (status === "loading") {
    return (
      <main className="main">
        <Loader label="Loading students..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main">
        <h1 className="section-title">Students</h1>
        <p>Please sign in to manage students.</p>
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
        <h1 className="section-title">Students</h1>
        <p>Only teachers can manage students.</p>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div className="brand" style={{ fontSize: 28 }}>
          <span>Students</span>
          <span className="badge" style={{ background: "#f1c40f", color: "#4a2f00" }}>Teacher</span>
        </div>
        <div className="cta-row" style={{ margin: 0 }}>
          <a className="button secondary" href="/teacher" style={{ background: "#eef4ff", color: "#216aa2", border: "none" }}>
            Back to Dashboard
          </a>
          <button 
            className="button primary" 
            onClick={handleInvite} 
            disabled={isLoading}
            style={{ boxShadow: "0 4px 14px rgba(52, 152, 219, 0.4)" }}
          >
            {isLoading ? "Creating..." : "Generate Student Token"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
        
        {/* Recent Tokens Section */}
        <section className="card" style={{ padding: 32, height: "fit-content" }}>
          <h2 style={{ fontSize: 20, fontFamily: "Poppins, sans-serif", marginBottom: 20, color: "#0f172a" }}>
            Recent Tokens
          </h2>
          {isFetching && <Loader label="Refreshing..." />}
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {(invitesData?.invites || []).slice(0, 6).map((invite) => (
              <div 
                key={invite._id} 
                style={{ 
                  background: "#f8fafc", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: 12, 
                  padding: "16px 20px" 
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: "#334155" }}>{invite.token}</span>
                  <span style={{ 
                    fontSize: 11, 
                    fontWeight: 600, 
                    padding: "2px 8px", 
                    borderRadius: 999, 
                    background: (invite.usedCount >= invite.maxUses) ? "#e2e8f0" : "#dcfce7", 
                    color: (invite.usedCount >= invite.maxUses) ? "#64748b" : "#166534" 
                  }}>
                    {invite.usedCount >= invite.maxUses ? "EXHAUSTED" : "ACTIVE"}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                  Usage: <span style={{ fontWeight: 600, color: "#475569" }}>{invite.usedCount || 0}/{invite.maxUses || 20}</span>
                </p>
              </div>
            ))}
            
            {!invitesData?.invites?.length && (
              <div style={{ textAlign: "center", padding: "30px 0", color: "#64748b" }}>
                <p>No tokens generated yet.</p>
                <p style={{ fontSize: 12 }}>Click 'Generate Student Token' to start.</p>
              </div>
            )}
          </div>
        </section>

        {/* Student List Section */}
        <section className="card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 20, fontFamily: "Poppins, sans-serif", marginBottom: 24, color: "#0f172a" }}>
            Student List
          </h2>
          
          <div className="table-wrap" style={{ border: "none", boxShadow: "none" }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ background: "#f1f5f9", color: "#475569", padding: "16px" }}>Name</th>
                  <th style={{ background: "#f1f5f9", color: "#475569", padding: "16px" }}>Email</th>
                  <th style={{ background: "#f1f5f9", color: "#475569", padding: "16px" }}>Gender</th>
                  <th style={{ background: "#f1f5f9", color: "#475569", padding: "16px" }}>Avg Score</th>
                  <th style={{ background: "#f1f5f9", color: "#475569", padding: "16px" }}>Attempts</th>
                  <th style={{ background: "#f1f5f9", color: "#475569", padding: "16px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(studentsData?.students || []).map((student) => (
                  <tr key={student.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 600, color: "#1e293b" }}>{student.name}</span>
                        {!student.isActive && (
                          <span style={{ 
                            fontSize: 10, 
                            background: "#fee2e2", 
                            color: "#b91c1c", 
                            padding: "2px 6px", 
                            borderRadius: 4,
                            fontWeight: 700
                          }}>
                            DEACTIVATED
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "16px", color: "#64748b" }}>{student.email}</td>
                    <td style={{ padding: "16px", color: "#64748b", textTransform: "capitalize" }}>{student.gender}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ 
                        fontWeight: 700, 
                        color: student.avgScore >= 70 ? "#16a34a" : "#d97706" 
                      }}>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td style={{ padding: "16px", color: "#64748b" }}>{student.attemptCount}</td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <a 
                          href={`/teacher/students/${student.id}`}
                          style={{ 
                            display: "inline-block",
                            padding: "6px 12px",
                            background: "#e0f2fe", 
                            color: "#0369a1", 
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600
                          }}
                        >
                          Details
                        </a>
                        <button 
                          onClick={async () => {
                            if (confirm(`Are you sure you want to ${student.isActive ? "deactivate" : "activate"} ${student.name}'s account?`)) {
                              try {
                                await updateStudent({ id: student.id, isActive: !student.isActive }).unwrap();
                                toast.success(`Account ${student.isActive ? "deactivated" : "activated"}`);
                              } catch (err) {
                                toast.error("Failed to update status");
                              }
                            }
                          }}
                          style={{ 
                            padding: "6px 12px",
                            background: student.isActive ? "#fee2e2" : "#dcfce7", 
                            color: student.isActive ? "#b91c1c" : "#16a34a", 
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer"
                          }}
                        >
                          {student.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!studentsData?.students?.length && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
                      No students found. Generate a token to invite your first student.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}
