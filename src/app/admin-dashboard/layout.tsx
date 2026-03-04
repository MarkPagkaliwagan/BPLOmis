import { ReactNode } from "react";
import AdminNavbar from "@/components/DifNavbar/AdminNavbar";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AdminNavbar />
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}