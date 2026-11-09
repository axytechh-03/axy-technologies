import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f3f6fb] flex flex-col lg:flex-row">
      <AdminSidebar
        adminEmail={admin.email}
        adminName={admin.fullName}
        adminRole={admin.role}
      />
      <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
