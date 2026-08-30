import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

function adminEmails() {
  const value = process.env.ADMIN_EMAILS ?? "";
  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminUser() {
  const user = await getChatGPTUser();
  if (!user) return { user: null, authorized: false, configured: adminEmails().length > 0 };
  const allowed = adminEmails();
  return {
    user,
    authorized: allowed.includes(user.email.toLowerCase()),
    configured: allowed.length > 0,
  };
}

export async function requireAdminPage() {
  const user = await requireChatGPTUser("/admin");
  const allowed = adminEmails();
  return {
    user,
    authorized: allowed.includes(user.email.toLowerCase()),
    configured: allowed.length > 0,
  };
}
