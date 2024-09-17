import React from "react";

import AdminSidebar from "@/components/ui/root/AdminSidebar";
import UserSidebar from "@/components/ui/root/UserSidebar";
import { user } from "@/constants/user";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen max-w-[1400px] mx-auto">
      {/* Sidebar */}
      {user.role === "admin" ? <AdminSidebar /> : <UserSidebar user={user} />}

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-y-auto p-6">{children}</div>
    </div>
  );
}
