import { redirect } from "next/navigation";
import { getAdminConfiguration, getAdminSessionUser } from "@/lib/admin-session";

export async function getAdminUser() {
  const user = await getAdminSessionUser();
  return { user, authorized: Boolean(user), configured: getAdminConfiguration().configured };
}

export async function requireAdminPage() {
  const auth = await getAdminUser();
  if (!auth.authorized || !auth.user) redirect("/admin/login");
  return { ...auth, user: auth.user };
}
