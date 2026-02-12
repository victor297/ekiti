"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const links = [
  { href: "/teacher", label: "Dashboard" },
  { href: "/teacher/lessons", label: "Lessons" },
  { href: "/teacher/students", label: "Students" },
  { href: "/teacher/quizzes", label: "Quiz Editor" },
  { href: "/teacher/attempts", label: "Attempts" },
  { href: "/teacher/lessons/new", label: "Create Lesson" }
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header-mobile">
        <div className="sidebar-brand">
          <span>Teacher</span>
          <span className="badge">Tools</span>
        </div>
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`sidebar-link ${pathname === link.href ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button 
          className="sidebar-link logout" 
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{ marginTop: "auto", background: "rgba(231, 76, 60, 0.1)", color: "#e74c3c", border: "1px solid rgba(231, 76, 60, 0.2)" }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
