import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ShieldCheck, Headphones, Gift, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import type { ComponentType, SVGProps } from "react";

import {
  CreditCardIcon,
  BuildingOffice2Icon,
  HomeIcon,
  HomeModernIcon,
  BanknotesIcon,
  TruckIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;
type Step = { titre: string; desc: string };
type TarifRow = { service: string; prix: string };
type TarifSection = { titre: string; rows: TarifRow[] };
type FaqItem = { q: string; a: string };
type EligibiliteItem = { titre: string; desc: string };
type AvantageCard = { titre: string; desc: string; Icon: ComponentType<{ className?: string }> };

type OffreData = {
  slug: string;
  categorie: string;
  titre: string;
  sousTitre: string;
  accroche?: string;
  description: string;
  avantages: string[];
  avantagesCards?: AvantageCard[];
  conditions: string[];
  eligibiliteDetail?: EligibiliteItem[];
  steps: Step[];
  tarifs?: TarifSection[];
  faq?: FaqItem[];
  prime?: string;
  cta: string;
  couleur: string;
  Icon: HeroIcon;
  registerType?: string;
};

const offres: Record<string, OffreData> = {
  "compte-personnel": {
    slug: "compte-personnel",
    categorie: "Compte Bancaire",
    titre: "Compte Personnel",
    sousTitre: "L'essentiel pour vos dépenses quotidiennes",
    accroche: "À distance, mais jamais loin de vous",
    description:
      "Loin des yeux, près de votre compte : vous gérez votre argent à distance, mais avec votre budget à portée de main. Chez vous ou à l'extérieur, depuis votre smartphone, votre tablette ou votre ordinateur, votre compte NELLOA BANK est toujours près de vous. Suivi de votre budget, alertes SMS, catégorisation des dépenses… des outils simples et pratiques pour gérer votre argent et mettre de côté pour vos projets.",
    avantages: [
      "IBAN personnel dédié",
      "Carte virtuelle Visa incluse",
      "Suivi des dépenses en temps réel",
      "Virements SEPA gratuits",
      "Application mobile intuitive",
      "Notifications instantanées",
    ],
    avantagesCards: [
      { titre: "Offre de bienvenue", desc: "Profitez d'une carte Visa Gratuite et de 90 € offerts à l'ouverture de votre compte.", Icon: Gift },
      { titre: "Assistance clientèle", desc: "Un conseiller vous est dédié pendant et après l'ouverture de votre compte.", Icon: Headphones },
      { titre: "Sécurité maximale", desc: "Nos standards de cryptage vous assurent une sécurité maximale sur toutes vos transactions.", Icon: ShieldCheck },
      { titre: "Engagement qualité", desc: "Nous nous engageons à une prise en charge de toutes vos demandes sous 48 h.", Icon: Clock },
    ],
    conditions: [
      "Être majeur et résident en France ou à l'étranger",
      "Pièce d'identité valide",
      "Revenus minimum de 800 € / mois",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Toute personne physique, majeure, résidant en France ou non, agissant en tant que particulier ou entrepreneur individuel à titre privé." },
      { titre: "Dépôt d'ouverture", desc: "Montant minimum de 1 € de dépôt initial, payé par virement en provenance d'un compte à votre nom ou par un autre moyen de transfert. Cette somme est disponible sur votre compte dès l'ouverture effective." },
      { titre: "Conditions de revenu", desc: "Nous exigeons un minimum de 800 € de revenus mensuels (compte courant) ou 1 000 € (compte joint). Aucune obligation de domiciliation de vos revenus chez nous." },
    ],
    steps: [
      { titre: "Remplissez le formulaire", desc: "Simple et rapide, quelques minutes suffisent pour remplir le formulaire en ligne depuis n'importe quel appareil." },
      { titre: "Transmettez votre dossier", desc: "Téléchargez vos pièces justificatives (pièce d'identité, justificatif de revenus) pour l'étude de votre dossier." },
      { titre: "Signez votre demande", desc: "Signez votre contrat électroniquement après avoir complété le formulaire de demande." },
      { titre: "Activez votre compte", desc: "Effectuez votre premier versement et recevez votre carte Visa gratuite. Votre compte est opérationnel !" },
    ],
    tarifs: [
      {
        titre: "Cartes et services",
        rows: [
          { service: "Abonnement pour gérer ses comptes en ligne et sur les applications NELLOA BANK", prix: "Gratuit" },
          { service: "Alertes SMS sur la situation du compte", prix: "Gratuit" },
          { service: "Carte de paiement internationale à débit immédiat (Visa Classic)", prix: "Gratuit" },
          { service: "Carte de paiement internationale à débit différé (Visa Classic)", prix: "Gratuit" },
          { service: "Carte à autorisation systématique (Visa Premier)", prix: "Gratuit" },
          { service: "Retrait en euros dans un DAB d'un autre établissement (zone euro)", prix: "Gratuit" },
        ],
      },
      {
        titre: "Virement",
        rows: [
          { service: "Virement unitaire par Internet (site ou applications mobile/tablette)", prix: "Gratuit" },
          { service: "Virement unitaire par l'intermédiaire d'un conseiller", prix: "3,90 €" },
        ],
      },
      {
        titre: "Frais de prélèvement",
        rows: [
          { service: "Mise en place d'une autorisation de prélèvement", prix: "Gratuit" },
          { service: "Frais par prélèvement", prix: "Gratuit" },
          { service: "Commission d'intervention", prix: "Gratuit" },
          { service: "Assurance perte ou vol des moyens de paiement", prix: "26,50 € / an" },
          { service: "Frais de tenue de compte", prix: "1 €" },
        ],
      },
    ],
    faq: [
      {
        q: "Quelles sont les conditions pour ouvrir un compte bancaire ?",
        a: "L'ouverture est soumise à acceptation. Vous devez être une personne physique, résidant en France ou non, majeure ; ouvrir un compte en tant que particulier ; et justifier de revenus minimum de 800 € / mois (compte courant) ou 1 000 € / mois (compte joint).",
      },
      {
        q: "L'ouverture de compte est-elle payante ?",
        a: "Non, l'ouverture d'un compte NELLOA BANK est entièrement gratuite. La plupart des opérations courantes depuis votre espace client sont également gratuites.",
      },
      {
        q: "Quand et comment vais-je recevoir ma carte bancaire ?",
        a: "Votre carte Visa virtuelle est disponible immédiatement après l'activation de votre compte. Une carte physique peut être commandée depuis votre espace client et vous sera livrée sous 3 à 5 jours ouvrés.",
      },
    ],
    prime: "90 € offerts + Carte Visa gratuite",
    cta: "Ouvrir un Compte Personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    Icon: CreditCardIcon,
    registerType: "personnel",
  },
  "compte-business": {
    slug: "compte-business",
    categorie: "Compte Bancaire",
    titre: "Compte Business",
    sousTitre: "La solution bancaire pour les professionnels et entrepreneurs",
    accroche: "Votre activité mérite une banque à sa hauteur",
    description:
      "Le Compte Business NELLOA BANK est taillé pour les indépendants, auto-entrepreneurs et PME qui souhaitent séparer leurs finances professionnelles et bénéficier d'outils dédiés à la gestion d'entreprise. Gérez vos flux, effectuez des virements illimités et accédez à votre tableau de bord depuis n'importe quel appareil.",
    avantages: [
      "IBAN professionnel séparé",
      "Carte Business Mastercard",
      "Virements illimités nationaux & internationaux",
      "Domiciliation bancaire reconnue",
      "Tableau de bord comptable intégré",
      "Accès multi-utilisateurs",
    ],
    avantagesCards: [
      { titre: "Offre de bienvenue", desc: "Carte Business offerte et 90 € crédités à l'ouverture de votre compte professionnel.", Icon: Gift },
      { titre: "Assistance clientèle", desc: "Un conseiller dédié vous accompagne à chaque étape, de l'ouverture à la gestion quotidienne.", Icon: Headphones },
      { titre: "Sécurité maximale", desc: "Cryptage bancaire de niveau professionnel pour protéger toutes vos transactions.", Icon: ShieldCheck },
      { titre: "Engagement qualité", desc: "Toutes vos demandes sont traitées sous 48 h par notre équipe dédiée aux professionnels.", Icon: Clock },
    ],
    conditions: [
      "Être dirigeant ou auto-entrepreneur",
      "Extrait Kbis ou statuts de société",
      "Pièce d'identité du gérant",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Toute personne morale ou physique agissant en qualité d'entrepreneur individuel, gérant, auto-entrepreneur ou dirigeant d'une société enregistrée." },
      { titre: "Dépôt d'ouverture", desc: "Dépôt minimum de 1 € pour activer le compte. Les fonds sont disponibles immédiatement après l'ouverture effective." },
      { titre: "Conditions de revenu", desc: "Revenus professionnels minimum de 1 000 € / mois. Aucune obligation de domiciliation de vos flux chez NELLOA BANK." },
    ],
    steps: [
      { titre: "Créez votre dossier", desc: "Renseignez les informations de votre entreprise et vos coordonnées professionnelles en quelques minutes." },
      { titre: "Fournissez vos justificatifs", desc: "Déposez votre Kbis ou statuts et une pièce d'identité. Traitement prioritaire pour les professionnels." },
      { titre: "Signez votre contrat", desc: "Signature électronique sécurisée de votre contrat d'ouverture en moins de 5 minutes." },
      { titre: "Démarrez votre activité", desc: "Votre IBAN professionnel est actif, votre carte Business est en route et la prime est créditée." },
    ],
    tarifs: [
      {
        titre: "Cartes et services",
        rows: [
          { service: "Abonnement gestion en ligne et applications NELLOA BANK", prix: "Gratuit" },
          { service: "Alertes SMS sur la situation du compte", prix: "Gratuit" },
          { service: "Carte Business Mastercard internationale", prix: "Gratuit" },
          { service: "Retrait DAB zone euro", prix: "Gratuit" },
        ],
      },
      {
        titre: "Virement",
        rows: [
          { service: "Virement unitaire par Internet (site ou applications)", prix: "Gratuit" },
          { service: "Virement unitaire via conseiller", prix: "3,90 €" },
          { service: "Virement international SWIFT", prix: "4,90 €" },
        ],
      },
      {
        titre: "Autres frais",
        rows: [
          { service: "Mise en place d'une autorisation de prélèvement", prix: "Gratuit" },
          { service: "Commission d'intervention", prix: "Gratuit" },
          { service: "Frais de tenue de compte", prix: "1 €" },
        ],
      },
    ],
    faq: [
      {
        q: "Quelles sont les conditions pour ouvrir un compte Business ?",
        a: "Vous devez être dirigeant, auto-entrepreneur ou représentant légal d'une société. Un Kbis ou des statuts, ainsi qu'une pièce d'identité du gérant sont requis. L'ouverture est soumise à acceptation par NELLOA BANK.",
      },
      {
        q: "L'ouverture de compte Business est-elle payante ?",
        a: "Non, l'ouverture est entièrement gratuite. La plupart des opérations courantes depuis votre espace client professionnel sont également gratuites.",
      },
      {
        q: "Puis-je avoir plusieurs utilisateurs sur mon compte Business ?",
        a: "Oui, le compte Business NELLOA BANK permet l'accès multi-utilisateurs avec des niveaux de droits paramétrables depuis votre tableau de bord.",
      },
    ],
    prime: "90 € offerts + Carte Business gratuite",
    cta: "Ouvrir un Compte Business",
    couleur: "from-[#1E3A8A] to-[#0EA5E9]",
    Icon: BuildingOffice2Icon,
    registerType: "courant",
  },
  "carte-bancaire": {
    slug: "carte-bancaire",
    categorie: "Compte Bancaire",
    titre: "Carte Bancaire",
    sousTitre: "Une carte pour payer partout, en toute sécurité",
    accroche: "Payez en ligne, en magasin ou à l'étranger, sans limites",
    description:
      "La carte NELLOA BANK vous accompagne dans toutes vos transactions, en ligne comme en magasin. Choisissez entre notre carte virtuelle gratuite disponible immédiatement ou notre carte physique Gold internationale, acceptée dans plus de 150 pays. Blocage instantané, alertes en temps réel, cashback — tout est conçu pour vous simplifier la vie.",
    avantages: [
      "Carte virtuelle disponible immédiatement",
      "Carte physique Gold internationale",
      "Paiements sans contact",
      "Cashback sur vos achats",
      "Blocage/déblocage instantané",
      "Assurance voyage incluse",
    ],
    avantagesCards: [
      { titre: "Offre de bienvenue", desc: "Carte Visa offerte à l'ouverture de votre compte, sans frais cachés ni abonnement.", Icon: Gift },
      { titre: "Assistance clientèle", desc: "Un conseiller disponible pour répondre à toutes vos questions sur votre carte.", Icon: Headphones },
      { titre: "Sécurité maximale", desc: "Authentification 3D Secure et alertes SMS pour chaque transaction suspecte.", Icon: ShieldCheck },
      { titre: "Engagement qualité", desc: "Opposition et remplacement de carte pris en charge sous 48 h.", Icon: Clock },
    ],
    conditions: [
      "Être titulaire d'un compte NELLOA BANK",
      "Vérification d'identité complétée",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Tout titulaire d'un compte NELLOA BANK (Personnel, Business ou Premium). La carte est incluse automatiquement à l'ouverture." },
      { titre: "Carte virtuelle", desc: "Disponible immédiatement après validation de votre dossier KYC. Utilisable partout où Visa est accepté." },
      { titre: "Carte physique Gold", desc: "Commandable depuis votre espace client. Livraison sous 3 à 5 jours ouvrés, gratuite." },
    ],
    steps: [
      { titre: "J'ouvre mon compte", desc: "La carte est incluse à l'ouverture de tout compte NELLOA BANK. Remplissez le formulaire en ligne." },
      { titre: "Je choisis ma carte", desc: "Sélectionnez la carte virtuelle (disponible immédiatement) ou la carte Gold physique (livrée sous 3–5 jours ouvrés)." },
      { titre: "Je l'active", desc: "Activation en un clic depuis votre espace client ou l'application mobile." },
      { titre: "Je paye partout", desc: "Votre carte est active. Utilisez-la en ligne, en magasin et dans le monde entier dès réception." },
    ],
    tarifs: [
      {
        titre: "Carte et services associés",
        rows: [
          { service: "Carte virtuelle Visa (disponible immédiatement)", prix: "Gratuit" },
          { service: "Carte physique Gold internationale", prix: "Gratuit" },
          { service: "Remplacement de carte perdue ou volée", prix: "Gratuit" },
          { service: "Paiements sans contact en euros", prix: "Gratuit" },
          { service: "Retrait DAB zone euro", prix: "Gratuit" },
          { service: "Retrait DAB hors zone euro", prix: "1,50 €" },
          { service: "Assurance perte ou vol des moyens de paiement", prix: "26,50 € / an" },
        ],
      },
      {
        titre: "Options premium",
        rows: [
          { service: "Cashback sur achats (compte Premium)", prix: "2 %" },
          { service: "Assurance voyage incluse (compte Premium)", prix: "Incluse" },
          { service: "Plafond de paiement relevé sur demande", prix: "Gratuit" },
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps pour recevoir ma carte physique ?",
        a: "Votre carte physique Gold est expédiée sous 24 h ouvrées après commande depuis votre espace client. Elle arrive en 3 à 5 jours ouvrés. La carte virtuelle, elle, est disponible instantanément.",
      },
      {
        q: "Que faire en cas de perte ou vol de ma carte ?",
        a: "Bloquez votre carte en un clic depuis l'application ou l'espace client, à toute heure. Signalez ensuite l'incident à votre conseiller pour un remplacement gratuit sous 48 h.",
      },
      {
        q: "Le cashback est-il disponible sur tous les comptes ?",
        a: "Le cashback de 2 % est réservé aux titulaires d'un compte Premium NELLOA BANK. Les comptes Personnel et Business bénéficient des autres avantages carte.",
      },
    ],
    prime: "Carte offerte à l'ouverture",
    cta: "Obtenir ma carte",
    couleur: "from-[#1E3A8A] to-[#7C3AED]",
    Icon: SparklesIcon,
    registerType: "premium",
  },
  "pret-immobilier": {
    slug: "pret-immobilier",
    categorie: "Crédit Bancaire",
    titre: "Prêt Immobilier",
    sousTitre: "Financez votre projet immobilier aux meilleures conditions",
    accroche: "Votre résidence principale, secondaire ou locative à portée de main",
    description:
      "NELLOA BANK vous accompagne dans l'acquisition de votre résidence principale, secondaire ou d'un bien locatif. Nos conseillers analysent votre dossier et vous proposent un taux compétitif adapté à votre profil. Réponse de principe sous 48 h, signature électronique et déblocage des fonds directement chez le notaire.",
    avantages: [
      "Taux fixe dès 2,8 % annuel",
      "Durée jusqu'à 25 ans",
      "Jusqu'à 500 000 € financés",
      "Réponse de principe sous 48 h",
      "Assurance emprunteur intégrée",
      "Modulation des mensualités possible",
    ],
    avantagesCards: [
      { titre: "Taux compétitif", desc: "Des taux fixes parmi les plus bas du marché, négociés pour chaque profil emprunteur.", Icon: Gift },
      { titre: "Conseiller dédié", desc: "Un expert immobilier vous accompagne de la simulation au déblocage des fonds.", Icon: Headphones },
      { titre: "Dossier sécurisé", desc: "Vos documents sont transmis et traités dans un environnement entièrement chiffré.", Icon: ShieldCheck },
      { titre: "Réponse rapide", desc: "Réponse de principe sous 48 h après réception de votre dossier complet.", Icon: Clock },
    ],
    conditions: [
      "Revenus stables justifiés",
      "Apport personnel recommandé (10 %)",
      "Taux d'endettement inférieur à 35 %",
      "Pièces d'identité et justificatifs de revenus",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Toute personne physique majeure, salariée, indépendante ou retraitée, souhaitant financer l'achat d'un bien immobilier à usage résidentiel ou locatif." },
      { titre: "Apport & endettement", desc: "Un apport personnel de 10 % est recommandé. Le taux d'endettement global ne doit pas dépasser 35 % de vos revenus nets mensuels." },
      { titre: "Justificatifs requis", desc: "Pièce d'identité, 3 derniers bulletins de salaire (ou bilan pour indépendants), relevés bancaires des 3 derniers mois, compromis de vente ou promesse d'achat." },
    ],
    steps: [
      { titre: "Je simule mon prêt", desc: "Indiquez le montant, la durée souhaitée et vos revenus. Obtenez une estimation de vos mensualités en temps réel." },
      { titre: "Je dépose mon dossier", desc: "Transmettez vos justificatifs (revenus, identité, compromis de vente). Un conseiller analyse votre demande sous 48 h." },
      { titre: "Je reçois l'offre", desc: "Votre offre de prêt personnalisée est émise. Vous disposez de 10 jours de réflexion avant signature." },
      { titre: "Je signe et je finance", desc: "Signature électronique, déblocage des fonds directement chez le notaire ou le vendeur." },
    ],
    tarifs: [
      {
        titre: "Frais liés au prêt immobilier",
        rows: [
          { service: "Frais de dossier", prix: "Gratuit" },
          { service: "Taux fixe annuel (selon profil)", prix: "Dès 2,8 %" },
          { service: "Assurance emprunteur (décès / invalidité)", prix: "Incluse" },
          { service: "Remboursement anticipé total ou partiel", prix: "Gratuit" },
          { service: "Modulation des mensualités", prix: "Gratuit" },
          { service: "Frais de garantie (hypothèque ou caution)", prix: "Selon notaire" },
        ],
      },
    ],
    faq: [
      {
        q: "Quel montant puis-je emprunter ?",
        a: "NELLOA BANK finance jusqu'à 500 000 € sur une durée maximale de 25 ans, sous réserve que votre taux d'endettement n'excède pas 35 % de vos revenus nets mensuels.",
      },
      {
        q: "Dois-je avoir un apport personnel ?",
        a: "Un apport de 10 % est recommandé pour couvrir les frais de notaire et de garantie. Cependant, des dossiers sans apport peuvent être étudiés au cas par cas selon votre profil.",
      },
      {
        q: "Combien de temps prend l'étude de mon dossier ?",
        a: "Une réponse de principe vous est communiquée sous 48 h après réception de votre dossier complet. L'offre officielle de prêt est ensuite émise dans les 7 jours.",
      },
    ],
    cta: "Simuler mon prêt immobilier",
    couleur: "from-[#065F46] to-[#059669]",
    Icon: HomeIcon,
    registerType: "personnel",
  },
  "pret-personnel": {
    slug: "pret-personnel",
    categorie: "Crédit Bancaire",
    titre: "Prêt Personnel",
    sousTitre: "Un financement flexible pour tous vos projets",
    accroche: "Voyages, travaux, mariage, auto… Financez vos projets sans justificatif",
    description:
      "Le prêt personnel NELLOA BANK vous donne accès aux fonds dont vous avez besoin rapidement, sans justificatif d'utilisation. Des mensualités fixes et prévisibles, aucun frais de dossier, et un remboursement anticipé toujours gratuit. Réponse immédiate en ligne, fonds disponibles sous 24 h.",
    avantages: [
      "De 500 € à 75 000 €",
      "Durée de 12 à 84 mois",
      "Taux fixe sans surprise",
      "Fonds disponibles sous 24 h",
      "Pas de frais de dossier",
      "Remboursement anticipé gratuit",
    ],
    avantagesCards: [
      { titre: "Sans justificatif", desc: "Aucune obligation de préciser l'utilisation des fonds. Vous êtes libre de financer ce que vous souhaitez.", Icon: Gift },
      { titre: "Conseiller dédié", desc: "Un conseiller vous accompagne pour choisir le montant et la durée adaptés à votre budget.", Icon: Headphones },
      { titre: "100 % sécurisé", desc: "Signature électronique et transmission de documents entièrement chiffrés.", Icon: ShieldCheck },
      { titre: "Réponse immédiate", desc: "Réponse de principe instantanée en ligne. Fonds virés sous 24 h après validation.", Icon: Clock },
    ],
    conditions: [
      "Être majeur et résident",
      "Justificatif de revenus réguliers",
      "Taux d'endettement inférieur à 33 %",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Toute personne physique majeure disposant de revenus réguliers (salarié, indépendant, retraité). Résidence en France ou à l'étranger acceptée." },
      { titre: "Capacité d'emprunt", desc: "Le montant accordé dépend de vos revenus et de votre taux d'endettement, qui ne doit pas dépasser 33 % de vos revenus nets mensuels." },
      { titre: "Justificatifs requis", desc: "Pièce d'identité valide, 3 derniers bulletins de salaire ou avis d'imposition, relevé bancaire du dernier mois." },
    ],
    steps: [
      { titre: "Je simule en ligne", desc: "Choisissez le montant et la durée. Le simulateur affiche vos mensualités et le coût total instantanément." },
      { titre: "Je soumets ma demande", desc: "Remplissez le formulaire et joignez vos justificatifs de revenus. Réponse de principe immédiate en ligne." },
      { titre: "Je signe mon contrat", desc: "Signature électronique sécurisée de votre contrat de prêt en quelques clics." },
      { titre: "Je reçois les fonds", desc: "Après validation, les fonds sont virés sur votre compte NELLOA BANK sous 24 h. Utilisez-les librement." },
    ],
    tarifs: [
      {
        titre: "Frais liés au prêt personnel",
        rows: [
          { service: "Frais de dossier", prix: "Gratuit" },
          { service: "Taux annuel effectif global (TAEG, selon profil)", prix: "Dès 3,5 %" },
          { service: "Remboursement anticipé total ou partiel", prix: "Gratuit" },
          { service: "Assurance décès / invalidité (optionnelle)", prix: "Sur devis" },
          { service: "Modification du montant des mensualités", prix: "Gratuit" },
        ],
      },
    ],
    faq: [
      {
        q: "Dois-je justifier l'utilisation des fonds ?",
        a: "Non. Le prêt personnel NELLOA BANK ne requiert aucun justificatif quant à l'utilisation des fonds. Vous êtes entièrement libre de les affecter selon vos besoins.",
      },
      {
        q: "Quel est le délai pour recevoir les fonds ?",
        a: "Après signature de votre contrat et expiration du délai légal de rétractation de 14 jours, les fonds sont virés sur votre compte dans les 24 heures.",
      },
      {
        q: "Puis-je rembourser mon prêt par anticipation ?",
        a: "Oui, à tout moment et sans frais. Vous pouvez effectuer un remboursement partiel ou total depuis votre espace client.",
      },
    ],
    cta: "Demander mon prêt personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    Icon: BanknotesIcon,
    registerType: "personnel",
  },
  "pret-auto": {
    slug: "pret-auto",
    categorie: "Crédit Bancaire",
    titre: "Prêt Auto",
    sousTitre: "Roulez maintenant, payez sereinement",
    accroche: "Véhicule neuf, occasion ou deux-roues — financement en 24 h",
    description:
      "Le prêt auto NELLOA BANK vous offre un financement rapide avec des conditions avantageuses, quel que soit le véhicule. Réponse immédiate en ligne, taux préférentiel pour les véhicules électriques et fonds débloqués directement auprès du vendeur ou du concessionnaire.",
    avantages: [
      "Financement jusqu'à 80 000 €",
      "Durée de 12 à 72 mois",
      "Taux préférentiel pour véhicule électrique",
      "Assurance auto intégrée en option",
      "Réponse immédiate en ligne",
      "Achat chez n'importe quel concessionnaire",
    ],
    avantagesCards: [
      { titre: "Taux préférentiel", desc: "Taux réduit pour les véhicules électriques et hybrides rechargeables, pour rouler vert au meilleur prix.", Icon: Gift },
      { titre: "Conseiller dédié", desc: "Un expert financement véhicule vous accompagne du choix de l'offre à la livraison des clés.", Icon: Headphones },
      { titre: "Dossier sécurisé", desc: "Transmission de vos documents dans un environnement entièrement chiffré et confidentiel.", Icon: ShieldCheck },
      { titre: "Déblocage rapide", desc: "Fonds débloqués directement auprès du concessionnaire ou du vendeur sous 24 h.", Icon: Clock },
    ],
    conditions: [
      "Être majeur et titulaire du permis B",
      "Justificatif de revenus",
      "Facture ou bon de commande du véhicule",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Toute personne physique majeure, titulaire du permis B, souhaitant financer l'achat d'un véhicule neuf, d'occasion, d'un deux-roues ou d'un utilitaire léger." },
      { titre: "Documents du véhicule", desc: "Facture pro forma, bon de commande ou annonce de vente du véhicule obligatoire pour le déblocage des fonds." },
      { titre: "Justificatifs requis", desc: "Pièce d'identité valide, permis de conduire, 3 derniers bulletins de salaire ou avis d'imposition." },
    ],
    steps: [
      { titre: "Je simule mon financement", desc: "Renseignez le prix du véhicule, votre apport et la durée souhaitée. Résultat immédiat en ligne." },
      { titre: "Je transmets mon dossier", desc: "Joignez la facture ou le bon de commande du véhicule, votre permis et vos justificatifs de revenus." },
      { titre: "Je signe mon contrat", desc: "Signature électronique sécurisée de votre contrat de financement auto." },
      { titre: "Je prends le volant", desc: "Accord validé, les fonds sont débloqués directement auprès du vendeur ou du concessionnaire. Bonne route !" },
    ],
    tarifs: [
      {
        titre: "Frais liés au prêt auto",
        rows: [
          { service: "Frais de dossier", prix: "Gratuit" },
          { service: "TAEG (selon profil et véhicule)", prix: "Dès 2,9 %" },
          { service: "Taux préférentiel véhicule électrique / hybride", prix: "Dès 1,9 %" },
          { service: "Remboursement anticipé total ou partiel", prix: "Gratuit" },
          { service: "Assurance auto (optionnelle)", prix: "Sur devis" },
        ],
      },
    ],
    faq: [
      {
        q: "Puis-je acheter chez n'importe quel concessionnaire ?",
        a: "Oui. Le prêt auto NELLOA BANK est valable chez tout concessionnaire ou vendeur particulier en France et en Europe. Les fonds sont débloqués directement auprès du vendeur.",
      },
      {
        q: "Y a-t-il un taux spécial pour les véhicules électriques ?",
        a: "Oui. Les véhicules 100 % électriques et hybrides rechargeables bénéficient d'un taux préférentiel dès 1,9 % TAEG, sous réserve d'acceptation du dossier.",
      },
      {
        q: "Dois-je apporter une contribution personnelle ?",
        a: "Aucun apport n'est obligatoire. NELLOA BANK peut financer jusqu'à 100 % du prix du véhicule, selon votre profil et votre capacité d'emprunt.",
      },
    ],
    cta: "Financer mon véhicule",
    couleur: "from-[#7C2D12] to-[#EA580C]",
    Icon: TruckIcon,
    registerType: "personnel",
  },
  "assurance-vie": {
    slug: "assurance-vie",
    categorie: "Assurance Partenaire",
    titre: "Assurance Vie",
    sousTitre: "Préparez l'avenir et protégez vos proches",
    accroche: "Épargnez, valorisez et transmettez — avec une fiscalité imbattable",
    description:
      "L'assurance vie NELLOA BANK est un placement à long terme qui combine protection de vos bénéficiaires et valorisation de votre épargne. Capital garanti sur fonds euros, fiscalité avantageuse dès 8 ans, versements libres ou programmés, transmission hors succession — un produit complet pour préparer sereinement votre avenir.",
    avantages: [
      "Capital garanti fonds euros",
      "Fiscalité avantageuse après 8 ans",
      "Versements libres ou programmés",
      "Transmission hors succession",
      "Désignation libre des bénéficiaires",
      "Rachat partiel à tout moment",
    ],
    avantagesCards: [
      { titre: "Fiscalité optimisée", desc: "Après 8 ans, profitez d'un abattement annuel de 4 600 € (9 200 € pour un couple) sur vos gains.", Icon: Gift },
      { titre: "Conseiller patrimonial", desc: "Un conseiller NELLOA BANK vous aide à définir votre profil d'investisseur et à choisir les bons supports.", Icon: Headphones },
      { titre: "Capital sécurisé", desc: "Fonds euros à capital garanti, disponibles à tout moment via rachat partiel ou total.", Icon: ShieldCheck },
      { titre: "Souscription rapide", desc: "Contrat ouvert et actif en moins de 48 h après validation de votre dossier.", Icon: Clock },
    ],
    conditions: [
      "Être majeur",
      "Versement initial minimum : 500 €",
      "Questionnaire de santé simplifié",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Toute personne physique majeure souhaitant constituer une épargne à long terme, préparer sa retraite ou organiser la transmission de son patrimoine." },
      { titre: "Versement initial", desc: "Minimum 500 € à l'ouverture. Les versements ultérieurs sont libres (à partir de 50 €) ou programmés selon la périodicité de votre choix." },
      { titre: "Questionnaire de santé", desc: "Un questionnaire de santé simplifié est requis pour les garanties complémentaires (prévoyance). Il ne conditionne pas l'ouverture du contrat épargne." },
    ],
    steps: [
      { titre: "Je choisis mon profil", desc: "Sélectionnez votre profil d'investisseur (prudent, équilibré, dynamique) et le montant de votre premier versement." },
      { titre: "Je désigne mes bénéficiaires", desc: "Renseignez librement les bénéficiaires de votre contrat (conjoint, enfants, tiers)." },
      { titre: "Je signe mon contrat", desc: "Signature électronique sécurisée en 5 minutes. Votre contrat est actif sous 48 h." },
      { titre: "Mon épargne fructifie", desc: "Effectuez des versements à tout moment et suivez la performance depuis votre espace client." },
    ],
    tarifs: [
      {
        titre: "Frais liés à l'assurance vie",
        rows: [
          { service: "Frais d'entrée / ouverture", prix: "Gratuit" },
          { service: "Frais de gestion annuels (fonds euros)", prix: "0,60 %" },
          { service: "Frais de gestion annuels (unités de compte)", prix: "0,85 %" },
          { service: "Frais sur versements complémentaires", prix: "Gratuit" },
          { service: "Frais de rachat partiel ou total", prix: "Gratuit" },
          { service: "Arbitrages entre supports", prix: "2 gratuits / an, puis 0,50 % " },
        ],
      },
    ],
    faq: [
      {
        q: "Puis-je récupérer mon argent à tout moment ?",
        a: "Oui. L'assurance vie n'est pas bloquée. Vous pouvez effectuer un rachat partiel ou total à tout moment. Fiscalement, il est conseillé d'attendre 8 ans pour bénéficier des abattements.",
      },
      {
        q: "Quelle est la fiscalité de l'assurance vie ?",
        a: "Avant 8 ans : imposition des gains au PFU (30 %) ou au barème IR. Après 8 ans : abattement annuel de 4 600 € (9 200 € en couple) sur les gains, puis 7,5 % de prélèvement forfaitaire.",
      },
      {
        q: "La transmission aux bénéficiaires est-elle taxée ?",
        a: "Les capitaux transmis au décès bénéficient d'un abattement de 152 500 € par bénéficiaire (pour les versements effectués avant 70 ans), puis taxation à 20 % — bien plus avantageux que les droits de succession classiques.",
      },
    ],
    cta: "Souscrire une assurance vie",
    couleur: "from-[#1E3A8A] to-[#6D28D9]",
    Icon: ShieldCheckIcon,
    registerType: "premium",
  },
  "assurance-habitat": {
    slug: "assurance-habitat",
    categorie: "Assurance Partenaire",
    titre: "Assurance Habitat",
    sousTitre: "Votre domicile protégé à 360°",
    accroche: "Locataire ou propriétaire — couvert en moins de 5 minutes",
    description:
      "L'assurance habitation NELLOA BANK couvre votre logement et son contenu contre tous les risques du quotidien : incendie, dégât des eaux, vol, catastrophes naturelles et responsabilité civile. Simple à souscrire, effective immédiatement, sans paperasse ni attente. L'attestation est disponible à télécharger dès la signature.",
    avantages: [
      "Couverture dégâts des eaux",
      "Protection incendie & explosion",
      "Vol et vandalisme couverts",
      "Responsabilité civile incluse",
      "Garantie catastrophes naturelles",
      "Assistance 24h/24 incluse",
    ],
    avantagesCards: [
      { titre: "Attestation immédiate", desc: "Votre attestation d'assurance est téléchargeable dans la minute suivant votre souscription.", Icon: Gift },
      { titre: "Assistance 24 h/24", desc: "Un service d'assistance est disponible à toute heure en cas de sinistre ou d'urgence.", Icon: Headphones },
      { titre: "Couverture complète", desc: "Incendie, dégâts des eaux, vol, responsabilité civile et catastrophes naturelles — tout est inclus.", Icon: ShieldCheck },
      { titre: "Tarif transparent", desc: "Prix calculé en temps réel selon votre logement. Aucun frais caché, résiliation à tout moment.", Icon: Clock },
    ],
    conditions: [
      "Être locataire ou propriétaire",
      "Renseignements sur le logement requis",
      "Attestation disponible immédiatement",
    ],
    eligibiliteDetail: [
      { titre: "Pour qui ?", desc: "Tout locataire ou propriétaire d'un logement à usage d'habitation principale ou secondaire, en France métropolitaine et DOM-TOM." },
      { titre: "Informations sur le logement", desc: "Surface habitable, type de bien (appartement ou maison), nombre de pièces, localisation et présence d'équipements spécifiques (piscine, jardin, alarme)." },
      { titre: "Sans sélection médicale", desc: "Aucun questionnaire de santé requis. La souscription est ouverte à tous, immédiatement et sans conditions particulières." },
    ],
    steps: [
      { titre: "Je décris mon logement", desc: "Surface, type de bien (appartement/maison), localisation. Le tarif est calculé en temps réel, sans surprises." },
      { titre: "Je personnalise mes garanties", desc: "Choisissez les options complémentaires (objets de valeur, jardin, piscine) selon vos besoins spécifiques." },
      { titre: "Je signe en ligne", desc: "Signature électronique sécurisée et paiement en quelques clics depuis votre espace client." },
      { titre: "Je suis assuré immédiatement", desc: "Attestation d'assurance téléchargeable instantanément. Couverture effective dès la signature." },
    ],
    tarifs: [
      {
        titre: "Garanties incluses",
        rows: [
          { service: "Responsabilité civile vie privée", prix: "Incluse" },
          { service: "Incendie, explosion, foudre", prix: "Incluse" },
          { service: "Dégâts des eaux", prix: "Incluse" },
          { service: "Vol et vandalisme", prix: "Incluse" },
          { service: "Catastrophes naturelles et technologiques", prix: "Incluse" },
          { service: "Assistance 24 h/24 en cas de sinistre", prix: "Incluse" },
        ],
      },
      {
        titre: "Options complémentaires",
        rows: [
          { service: "Objets de valeur (bijoux, œuvres d'art)", prix: "Sur devis" },
          { service: "Garantie jardin / piscine", prix: "+ à partir de 3 € / mois" },
          { service: "Protection juridique renforcée", prix: "+ à partir de 2 € / mois" },
        ],
      },
    ],
    faq: [
      {
        q: "Suis-je couvert immédiatement après la souscription ?",
        a: "Oui. Votre couverture est effective dès la signature électronique de votre contrat. L'attestation d'assurance est téléchargeable instantanément depuis votre espace client.",
      },
      {
        q: "Puis-je résilier à tout moment ?",
        a: "Oui. Depuis la loi Hamon, vous pouvez résilier votre assurance habitation à tout moment après la première année, sans frais ni pénalité, en respectant un préavis d'un mois.",
      },
      {
        q: "Comment déclarer un sinistre ?",
        a: "Déclarez votre sinistre depuis votre espace client ou en appelant le service d'assistance disponible 24 h/24. Un expert est dépêché sous 48 h pour les sinistres importants.",
      },
    ],
    cta: "Assurer mon logement",
    couleur: "from-[#0F766E] to-[#14B8A6]",
    Icon: HomeModernIcon,
    registerType: "personnel",
  },
};

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <span>{item.q}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OffrePage({ slug }: { slug: string }) {
  const offre = offres[slug];

  if (!offre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Offre introuvable</p>
          <Link href="/"><Button>Retour à l'accueil</Button></Link>
        </div>
      </div>
    );
  }

  const { Icon } = offre;
  const registerHref = `/register${offre.registerType ? `?type=${offre.registerType}` : ""}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── HEADER ── */}
      <Navbar />

      {/* ── HERO BANNER ── */}
      <section className={`bg-gradient-to-br ${offre.couleur} py-20 px-4`}>
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">{offre.categorie}</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{offre.titre}</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">{offre.sousTitre}</p>
          {offre.accroche && (
            <p className="text-white/70 mt-3 italic text-lg">{offre.accroche}</p>
          )}
          {offre.prime && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-full text-sm">
              <GiftIcon className="h-4 w-4" />
              {offre.prime}
            </div>
          )}
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto max-w-5xl px-4 py-16 flex-1">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">À propos de ce produit</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{offre.description}</p>
            </motion.div>

            {/* Inclus */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
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

            {/* Tarifs */}
            {offre.tarifs && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-foreground mb-2">Nos tarifs</h2>
                <p className="text-muted-foreground text-sm mb-6">La plupart des opérations courantes depuis votre espace client sont gratuites.</p>
                <div className="space-y-6">
                  {offre.tarifs.map((section) => (
                    <div key={section.titre} className="border border-border rounded-xl overflow-hidden">
                      <div className={`bg-gradient-to-r ${offre.couleur} px-5 py-3`}>
                        <h3 className="font-semibold text-white text-sm">{section.titre}</h3>
                      </div>
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-border">
                          {section.rows.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                              <td className="px-5 py-3 text-muted-foreground leading-snug">{row.service}</td>
                              <td className={`px-5 py-3 text-right font-semibold whitespace-nowrap ${row.prix === "Gratuit" ? "text-green-600" : "text-foreground"}`}>{row.prix}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Éligibilité */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Conditions d'éligibilité</h2>
              {offre.eligibiliteDetail ? (
                <div className="space-y-4">
                  {offre.eligibiliteDetail.map((item) => (
                    <div key={item.titre} className="p-5 bg-slate-50 border border-border rounded-xl">
                      <p className="font-semibold text-foreground mb-1">{item.titre}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {offre.conditions.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* FAQ */}
            {offre.faq && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-foreground mb-6">Questions fréquentes</h2>
                <div className="space-y-3">
                  {offre.faq.map((item) => (
                    <FaqItem key={item.q} item={item} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — sticky CTA card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{offre.titre}</h3>
              </div>
              {offre.prime && (
                <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 rounded-lg p-3 text-sm font-medium mb-6">
                  <GiftIcon className="h-4 w-4 shrink-0" />
                  {offre.prime}
                </div>
              )}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Ouvrez votre compte en moins de 3 minutes. Entièrement en ligne, sans rendez-vous.
              </p>
              <Link href={registerHref}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 flex items-center justify-center gap-2" data-testid="offre-cta-button">
                  {offre.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground text-center mt-4">Sans engagement — ouverture gratuite</p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Vous avez des questions ?</p>
                <a href="mailto:contact@nelloa-bank.com" className="text-sm text-primary hover:underline">Contacter un conseiller →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Simple et rapide</p>
            <h2 className="text-3xl font-bold text-foreground">Comment ouvrir un compte NELLOA BANK ?</h2>
            {offre.prime && (
              <p className="text-muted-foreground mt-3">Bénéficiez de <span className="font-semibold text-foreground">{offre.prime}</span>.</p>
            )}
          </div>

          <div className={`grid md:grid-cols-${offre.steps.length} gap-8 relative`}>
            {offre.steps.length > 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-border z-0" />
            )}
            {offre.steps.map((step, i) => (
              <motion.div
                key={step.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="flex flex-col items-center text-center relative z-10"
                data-testid={`step-${i + 1}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-5 shadow-md bg-gradient-to-br ${offre.couleur} text-white`}>
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{step.titre}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVANTAGES CARDS ── */}
      {offre.avantagesCards && (
        <section className="py-20 bg-white border-t border-border">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Profitez des avantages de votre compte</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">NELLOA BANK vous offre plusieurs avantages dès l'ouverture de votre compte bancaire en ligne.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offre.avantagesCards.map((card) => (
                <motion.div
                  key={card.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center p-6 bg-slate-50 border border-border rounded-2xl hover:shadow-md transition-shadow"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${offre.couleur} flex items-center justify-center mb-4`}>
                    <card.Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{card.titre}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section className={`py-20 px-4 bg-gradient-to-br ${offre.couleur}`}>
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Icon className="h-9 w-9 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à commencer ?</h2>
            <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
              Ouvrez votre {offre.titre} en moins de 3 minutes.
              {offre.prime && ` Profitez de ${offre.prime}.`}
            </p>
            <Link href={registerHref}>
              <Button
                size="lg"
                className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-14 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-base"
                data-testid="offre-cta-bottom"
              >
                {offre.cta}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <p className="text-white/60 text-sm mt-5">Sans engagement · Gratuit · 100 % en ligne</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1E3A8A] border-t border-white/10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="font-bold text-xl text-white">NELLOA BANK</Link>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link href="/offres/compte-personnel" className="text-white/60 text-sm hover:text-white transition-colors">Compte Personnel</Link>
              <Link href="/offres/compte-business" className="text-white/60 text-sm hover:text-white transition-colors">Compte Business</Link>
              <Link href="/credits/pret-immobilier" className="text-white/60 text-sm hover:text-white transition-colors">Prêt Immobilier</Link>
              <Link href="/credits/pret-personnel" className="text-white/60 text-sm hover:text-white transition-colors">Prêt Personnel</Link>
              <Link href="/assurances/assurance-vie" className="text-white/60 text-sm hover:text-white transition-colors">Assurance Vie</Link>
              <Link href="/assurances/assurance-habitat" className="text-white/60 text-sm hover:text-white transition-colors">Assurance Habitat</Link>
            </nav>
            <div className="flex gap-5 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <p className="text-center text-white/40 text-xs mt-6">© 2025 NELLOA BANK. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}
