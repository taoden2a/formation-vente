"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/membre",
    });

    if (!res) {
      setError("Erreur inconnue.");
      return;
    }
    if (res.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    window.location.href = res.url ?? "/membre";
  }

  return (
    <main className="mx-auto max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Connexion</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <div className="space-y-2">
          <input
            className="w-full rounded border p-2"
            placeholder="Mot de passe"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <label className="flex items-center gap-2 text-sm select-none">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Afficher le mot de passe
          </label>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button className="w-full rounded border p-2" type="submit">
          Se connecter
        </button>
      </form>
    </main>
  );
}