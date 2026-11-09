import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/auth";

export default async function AdminIndexPage() {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");
}
