import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type OffreData = {
  slug: string;
  categorie: string;
  titre: string;
  sousTitre: string;
  description: string;
  avantages: string[];
  conditions: string[];
  prime?: string;
  cta: string;
  couleur: string;
  icon: string;
  registerType?: string;
};

const offres: Record<string, OffreData> = {
  "compte-personnel": {
    slug: "compte-personnel",
    categorie: "Compte Bancaire",
    titre: "Compte Personnel",
    sousTitre: "L'essentiel pour vos dépenses quotidiennes",
    description: "Le Compte Personnel NELLOA BANK est conçu pour vous offrir une gestion simple et efficace de vos finances du quotidien. Profitez d'un IBAN personnel, d'une carte virtuelle sécurisée et d'un suivi détaillé de vos dépenses — le tout depuis votre espace en ligne.",
    avantages: [
      "IBAN personnel dédié",
      "Carte virtuelle Visa incluse",
      "Suivi des dépenses en temps réel",
      "Virements SEPA gratuits",
      "Application mobile intuitive",
      "Notifications instantanées",
    ],
    conditions: [
      "Être majeur et résident",
      "Pièce d'identité valide",
      "Pas de revenus minimum requis",
    ],
    prime: "3 200 € offerts à l'ouverture",
    cta: "Ouvrir un Compte Personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    icon: "💳",
    registerType: "personnel",
  },
  "compte-business": {
    slug: "compte-business",
    categorie: "Compte Bancaire",
    titre: "Compte Business",
    sousTitre: "La solution bancaire pour les professionnels et entrepreneurs",
    description: "Le Compte Business NELLOA BANK est taillé pour les indépendants, auto-entrepreneurs et PME qui souhaitent séparer leurs finances professionnelles et bénéficier d'outils dédiés à la gestion d'entreprise.",
    avantages: [
      "IBAN professionnel séparé",
      "Carte Business Mastercard",
      "Virements illimités nationaux & internationaux",
      "Domiciliation bancaire reconnue",
      "Tableau de bord comptable intégré",
      "Accès multi-utilisateurs",
    ],
    conditions: [
      "Être dirigeant ou auto-entrepreneur",
      "Extrait Kbis ou statuts de société",
      "Pièce d'identité du gérant",
    ],
    prime: "3 200 € offerts à l'ouverture",
    cta: "Ouvrir un Compte Business",
    couleur: "from-[#1E3A8A] to-[#0EA5E9]",
    icon: "🏦",
    registerType: "courant",
  },
  "carte-bancaire": {
    slug: "carte-bancaire",
    categorie: "Compte Bancaire",
    titre: "Carte Bancaire",
    sousTitre: "Une carte pour payer partout, en toute sécurité",
    description: "La carte NELLOA BANK vous accompagne dans toutes vos transactions, en ligne comme en magasin. Choisissez entre notre carte virtuelle gratuite ou notre carte physique Gold internationale, acceptée dans plus de 150 pays.",
    avantages: [
      "Carte virtuelle disponible immédiatement",
      "Carte physique Gold internationale",
      "Paiements sans contact",
      "Cashback sur vos achats",
      "Blocage/déblocage instantané",
      "Assurance voyage incluse",
    ],
    conditions: [
      "Être titulaire d'un compte NELLOA BANK",
      "Vérification d'identité complétée",
    ],
    prime: "Carte offerte à l'ouverture",
    cta: "Obtenir ma carte",
    couleur: "from-[#1E3A8A] to-[#7C3AED]",
    icon: "💳",
    registerType: "premium",
  },
  "pret-immobilier": {
    slug: "pret-immobilier",
    categorie: "Crédit Bancaire",
    titre: "Prêt Immobilier",
    sousTitre: "Financez votre projet immobilier aux meilleures conditions",
    description: "NELLOA BANK vous accompagne dans l'acquisition de votre résidence principale, secondaire ou d'un bien locatif. Nos conseillers analysent votre dossier et vous proposent un taux compétitif adapté à votre profil.",
    avantages: [
      "Taux fixe dès 2,8 % annuel",
      "Durée jusqu'à 25 ans",
      "Jusqu'à 500 000 € financés",
      "Réponse de principe sous 48h",
      "Assurance emprunteur intégrée",
      "Modulation des mensualités possible",
    ],
    conditions: [
      "Revenus stables justifiés",
      "Apport personnel recommandé (10 %)",
      "Taux d'endettement inférieur à 35 %",
      "Pièces d'identité et justificatifs de revenus",
    ],
    cta: "Simuler mon prêt immobilier",
    couleur: "from-[#065F46] to-[#059669]",
    icon: "🏠",
    registerType: "personnel",
  },
  "pret-personnel": {
    slug: "pret-personnel",
    categorie: "Crédit Bancaire",
    titre: "Prêt Personnel",
    sousTitre: "Un financement flexible pour tous vos projets",
    description: "Voyages, travaux, mariage, électroménager... Le prêt personnel NELLOA BANK vous donne accès aux fonds dont vous avez besoin rapidement, sans justificatif d'utilisation, avec des mensualités fixes et prévisibles.",
    avantages: [
      "De 500 € à 75 000 €",
      "Durée de 12 à 84 mois",
      "Taux fixe sans surprise",
      "Fonds disponibles sous 24h",
      "Pas de frais de dossier",
      "Remboursement anticipé gratuit",
    ],
    conditions: [
      "Être majeur et résident",
      "Justificatif de revenus réguliers",
      "Taux d'endettement inférieur à 33 %",
    ],
    cta: "Demander mon prêt personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    icon: "💰",
    registerType: "personnel",
  },
  "pret-auto": {
    slug: "pret-auto",
    categorie: "Crédit Bancaire",
    titre: "Prêt Auto",
    sousTitre: "Roulez maintenant, payez sereinement",
    description: "Que ce soit pour l'achat d'un véhicule neuf, d'occasion ou d'un deux-roues, le prêt auto NELLOA BANK vous offre un financement rapide avec des conditions avantageuses. Notre simulateur en ligne vous donne une réponse immédiate.",
    avantages: [
      "Financement jusqu'à 80 000 €",
      "Durée de 12 à 72 mois",
      "Taux préférentiel pour véhicule électrique",
      "Assurance auto intégrée en option",
      "Réponse immédiate en ligne",
      "Achat chez n'importe quel concessionnaire",
    ],
    conditions: [
      "Être majeur et titulaire du permis B",
      "Justificatif de revenus",
      "Facture ou bon de commande du véhicule",
    ],
    cta: "Financer mon véhicule",
    couleur: "from-[#7C2D12] to-[#EA580C]",
    icon: "🚗",
    registerType: "personnel",
  },
  "assurance-vie": {
    slug: "assurance-vie",
    categorie: "Assurance Partenaire",
    titre: "Assurance Vie",
    sousTitre: "Préparez l'avenir et protégez vos proches",
    description: "L'assurance vie NELLOA BANK est un placement à long terme qui combine protection de vos bénéficiaires et valorisation de votre épargne. Bénéficiez d'une fiscalité avantageuse et d'un capital garanti.",
    avantages: [
      "Capital garanti fonds euros",
      "Fiscalité avantageuse après 8 ans",
      "Versements libres ou programmés",
      "Transmission hors succession",
      "Désignation libre des bénéficiaires",
      "Rachat partiel à tout moment",
    ],
    conditions: [
      "Être majeur",
      "Versement initial minimum : 500 €",
      "Questionnaire de santé simplifié",
    ],
    cta: "Souscrire une assurance vie",
    couleur: "from-[#1E3A8A] to-[#6D28D9]",
    icon: "🛡️",
    registerType: "premium",
  },
  "assurance-habitat": {
    slug: "assurance-habitat",
    categorie: "Assurance Partenaire",
    titre: "Assurance Habitat",
    sousTitre: "Votre domicile protégé à 360°",
    description: "L'assurance habitation NELLOA BANK couvre votre logement et son contenu contre tous les risques du quotidien : incendie, dégât des eaux, vol, catastrophes naturelles et responsabilité civile. Simple à souscrire, immédiate et sans paperasse.",
    avantages: [
      "Couverture dégâts des eaux",
      "Protection incendie & explosion",
      "Vol et vandalisme couverts",
      "Responsabilité civile incluse",
      "Garantie catastrophes naturelles",
      "Assistance 24h/24 incluse",
    ],
    conditions: [
      "Être locataire ou propriétaire",
      "Renseignements sur le logement",
      "Attestation disponible immédiatement",
    ],
    cta: "Assurer mon logement",
    couleur: "from-[#0F766E] to-[#14B8A6]",
    icon: "🏡",
    registerType: "personnel",
  },
};

export function OffrePage({ slug }: { slug: string }) {
  const offre = offres[slug];

  if (!offre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Offre introuvable</p>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">
            NELLOA BANK
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Connexion</Button>
            </Link>
            <Link href={`/register${offre.registerType ? `?type=${offre.registerType}` : ""}`}>
              <Button className="bg-primary text-white hover:bg-primary/90">Ouvrir un compte</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className={`bg-gradient-to-br ${offre.couleur} py-20 px-4`}>
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">{offre.categorie}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{offre.icon} {offre.titre}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{offre.sousTitre}</p>
          {offre.prime && (
            <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-full text-sm">
              🎁 {offre.prime}
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT - Description + avantages */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">À propos de ce produit</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{offre.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Ce qui est inclus</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {offre.avantages.map((av) => (
                  <li key={av} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{av}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Conditions d'éligibilité</h2>
              <ul className="space-y-3">
                {offre.conditions.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT - CTA card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-2">{offre.titre}</h3>
              {offre.prime && (
                <div className="bg-green-50 text-green-700 rounded-lg p-3 text-sm font-medium text-center mb-6">
                  🎁 {offre.prime}
                </div>
              )}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Ouvrez votre compte en moins de 3 minutes. Entièrement en ligne, sans rendez-vous.
              </p>
              <Link href={`/register${offre.registerType ? `?type=${offre.registerType}` : ""}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 flex items-center justify-center gap-2" data-testid="offre-cta-button">
                  {offre.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Sans engagement — ouverture gratuite
              </p>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Vous avez des questions ?</p>
                <a href="#" className="text-sm text-primary hover:underline">Contacter un conseiller →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
