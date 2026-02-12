import TeacherSidebar from "@/components/TeacherSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function TeacherLayout({ children }) {
  return (
    <div className="teacher-layout">
      <TeacherSidebar />
      <div className="teacher-content">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
