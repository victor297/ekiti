"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const crumbs = parts.map((part, index) => {
    const href = "/" + parts.slice(0, index + 1).join("/");
    const label = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label };
  });

  return (
    <div className="breadcrumbs">
      {crumbs.map((crumb, idx) => (
        <span key={crumb.href}>
          {idx > 0 && <span className="crumb-sep">/</span>}
          <a href={crumb.href}>{crumb.label}</a>
        </span>
      ))}
    </div>
  );
}
