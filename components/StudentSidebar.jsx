"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const links = [
  { href: "/student", label: "Dashboard" },
  { href: "/student/progress", label: "My Progress" },
  { href: "/", label: "Browse Topics" },
];

export default function StudentSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header-mobile">
        <div className="sidebar-brand">
          <span>Student</span>
          <span className="badge" style={{ background: "#2ecc71", color: "#0c1b2a" }}>Portal</span>
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
