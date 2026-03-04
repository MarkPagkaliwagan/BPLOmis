import { ReactNode } from "react";
import UserNavbar from "@/components/DifNavbar/UserNavbar";

export default function UserDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <UserNavbar />
<main className="flex-1 p-6 md:p-10">
  {children}
</main>
    </div>
  );
}