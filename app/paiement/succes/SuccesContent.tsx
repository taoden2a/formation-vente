"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function SuccesContent({ initialAccess }: { initialAccess: boolean }) {
  const [access, setAccess] = useState(initialAccess);
  const [polling, setPolling] = useState(!initialAccess);

  useEffect(() => {
    if (access || !polling) return;

    let attempts = 0;
    const maxAttempts = 10;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const res = await fetch("/api/access");

        if (!res.ok) return;

        const data = await res.json();

        if (data.access) {
          setAccess(true);
          setPolling(false);
          clearInterval(interval);
        }
      } catch {
        // on réessaie silencieusement
      }

      if (attempts >= maxAttempts) {
        setPolling(false);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [access, polling]);

  if (access) {
    return (
      <main className="mx-auto max-w-lg p-6 text-center space-y-6 py-24">
        <div className="text-5xl">&#10003;</div>
        <h1 className="text-3xl font-bold">Paiement réussi</h1>
        <p className="text-gray-600 text-lg">
          Merci pour votre achat. Votre accès à la formation est prêt.
        </p>
        <Button
          variant="action"
          size="lg"
          onClick={() => (window.location.href = "/membre")}
        >
          Accéder à la formation
        </Button>
      </main>
    );
  }

  if (polling) {
    return (
      <main className="mx-auto max-w-lg p-6 text-center space-y-6 py-24">
        <div className="animate-spin inline-block w-10 h-10 border-4 border-gray-300 border-t-pedagogy-blue-500 rounded-full" />
        <h1 className="text-3xl font-bold">Paiement réussi</h1>
        <p className="text-gray-600 text-lg">
          On finalise votre accès, un instant...
        </p>
      </main>
    );
  }

  // Polling terminé sans accès
  return (
    <main className="mx-auto max-w-lg p-6 text-center space-y-6 py-24">
      <h1 className="text-3xl font-bold">Paiement réussi</h1>
      <p className="text-gray-600 text-lg">
        Votre paiement a bien été reçu. L&apos;activation de votre accès peut
        prendre quelques minutes. Rechargez cette page ou contactez-nous si
        le problème persiste.
      </p>
      <Button
        variant="action"
        size="lg"
        onClick={() => window.location.reload()}
      >
        Recharger la page
      </Button>
    </main>
  );
}
