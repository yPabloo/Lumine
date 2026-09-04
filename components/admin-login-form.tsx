"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./admin-login-form.module.css";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Não foi possível entrar.");
      router.replace("/admin");
      router.refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon}><LockKeyhole /></div>
        <span className="kicker">Acesso restrito</span>
        <h1>Administração do Festival</h1>
        <p>Entre com o usuário e a senha definidos no arquivo <code>.env</code>.</p>
        {!configured && <p className="form-error" role="alert">A administração ainda não foi configurada. Preencha ADMIN_USER, ADMIN_PASSWORD, ADMIN_EMAIL e ADMIN_SESSION_SECRET.</p>}
        <form className={styles.form} onSubmit={submit}>
          <div className="field"><Label htmlFor="adminUsername">Usuário</Label><Input id="adminUsername" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} /></div>
          <div className="field"><Label htmlFor="adminPassword">Senha</Label><Input id="adminPassword" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <Button className={`button button--primary ${styles.submit}`} type="submit" disabled={loading || !configured}>{loading ? <><Loader2 className="spin" /> Entrando…</> : <><LogIn /> Entrar</>}</Button>
        </form>
        <Link className={styles.back} href="/">← Voltar ao site</Link>
      </section>
    </main>
  );
}
