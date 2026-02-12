import StudentSidebar from "@/components/StudentSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function LessonsLayout({ children }) {
  return (
    <div className="teacher-layout">
      <StudentSidebar />
      <div className="teacher-content">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
