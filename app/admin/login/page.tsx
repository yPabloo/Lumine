import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminUser } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Login administrativo" };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const auth = await getAdminUser();
  if (auth.authorized) redirect("/admin");
  return <AdminLoginForm configured={auth.configured} />;
}
