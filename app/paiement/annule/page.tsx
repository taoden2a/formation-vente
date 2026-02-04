import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PaiementAnnulePage() {
  return (
    <main className="mx-auto max-w-lg p-6 text-center space-y-6 py-24">
      <div className="text-5xl">&#10007;</div>
      <h1 className="text-3xl font-bold">Paiement annulé</h1>
      <p className="text-gray-600 text-lg">
        Aucun débit n&apos;a été effectué. Vous pouvez retenter le paiement à tout
        moment.
      </p>
      <Button variant="action" size="lg" asChild>
        <Link href="/#prix">Revenir à la page de paiement</Link>
      </Button>
    </main>
  );
}
