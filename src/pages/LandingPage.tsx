import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Quote, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";

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
  LockClosedIcon,
  BoltIcon,
  PhoneArrowUpRightIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  StarIcon as HeroStar,
} from "@heroicons/react/24/outline";

/* ─── DATA ─────────────────────────────────────────────── */

const testimonials = [
  { name: "Amara Diallo", role: "Entrepreneur", text: "NELLOA BANK a transformé ma façon de gérer mes finances. L'ouverture de compte a été ultra rapide et la prime de bienvenue est réelle. Je recommande !", initials: "AD" },
  { name: "Sophie Martin", role: "Freelance Designer", text: "Le tableau de bord est clair et intuitif. Fini les frais cachés, fini les longues attentes. Mon compte courant NELLOA m'a simplifié la vie au quotidien.", initials: "SM" },
  { name: "Kouassi Bamba", role: "Responsable commercial", text: "Le compte Premium vaut vraiment son nom. Mon conseiller dédié répond en moins d'une heure et le cashback 2 % m'a fait économiser plusieurs centaines d'euros.", initials: "KB" },
];

const faqs = [
  { question: "Combien de temps faut-il pour ouvrir un compte ?", answer: "L'ouverture de votre compte prend moins de 3 minutes. Remplissez le formulaire en ligne, déposez votre pièce d'identité, et notre équipe active votre compte sous 24h." },
  { question: "Comment fonctionne la prime de bienvenue de 3 200 € ?", answer: "Dès l'activation de votre compte par notre équipe, la prime de 3 200 € est créditée directement sur votre solde. Elle est disponible immédiatement pour vos transactions." },
  { question: "Quels documents sont nécessaires pour la vérification d'identité ?", answer: "Nous acceptons les cartes nationales d'identité, passeports et titres de séjour en cours de validité. Les fichiers acceptés sont JPG, PNG et PDF (max 10 Mo)." },
  { question: "Mon argent est-il en sécurité chez NELLOA BANK ?", answer: "Oui, absolument. NELLOA BANK utilise un chiffrement bancaire de niveau militaire (SSL 256 bits) et une authentification à deux facteurs pour protéger votre compte." },
  { question: "Puis-je changer de type de compte après l'ouverture ?", answer: "Oui. Vous pouvez faire une demande de changement de formule depuis votre espace client ou en contactant notre service client. La transition se fait sans interruption de service." },
  { question: "Comment contacter le service client ?", answer: "Notre équipe est disponible 7j/7 par email et par chat en direct depuis votre espace client. Les titulaires d'un compte Premium bénéficient d'un conseiller dédié joignable directement." },
];

/* ─── FAQ ITEM ──────────────────────────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors duration-200"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-primary shrink-0" />
          : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-card border-t border-border">
          <p className="pt-4 text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */

export function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">

      {/* ── HEADER ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center min-h-[680px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/90 via-[#1E3A8A]/80 to-[#3B82F6]/75" />
        <div className="container relative z-10 px-4 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl mx-auto tracking-tight">
              La banque qui vous fait confiance
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Ouvrez votre compte en 3 minutes et accédez à votre espace sécurisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-base h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Commencer maintenant
                </Button>
              </Link>
              <a href="#offres">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 rounded-full transition-all duration-300">
                  Voir nos offres
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">À propos de nous</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Une banque digitale pensée pour vous</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                NELLOA BANK est née d'une conviction simple : la banque doit s'adapter à votre vie, pas l'inverse. Fini les agences fermées le week-end, les formulaires papier et les frais opaques. Avec nous, tout se fait en ligne, en toute transparence.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Fondée par des experts de la finance et de la technologie, NELLOA BANK accompagne des milliers de clients dans la gestion de leurs comptes, crédits et assurances — avec une équipe support disponible 7 jours sur 7.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[{ value: "50 000+", label: "Clients actifs" }, { value: "99,9 %", label: "Disponibilité" }, { value: "7j/7", label: "Support client" }].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-slate-50 rounded-xl border border-border">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-2 gap-4">
              {[
                { Icon: LockClosedIcon, title: "Sécurité maximale", desc: "Chiffrement SSL 256 bits et authentification à deux facteurs pour protéger vos données." },
                { Icon: BoltIcon, title: "Ouverture en 3 min", desc: "Aucun rendez-vous nécessaire. Ouvrez votre compte 100 % en ligne, à toute heure." },
                { Icon: PhoneArrowUpRightIcon, title: "Support 7j/7", desc: "Une équipe dédiée disponible chaque jour pour répondre à toutes vos questions." },
                { Icon: GlobeAltIcon, title: "Partout dans le monde", desc: "Virements internationaux et carte acceptée dans plus de 150 pays." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OFFRES ── */}
      <section id="offres" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos Produits & Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Des solutions bancaires complètes adaptées à chaque besoin.</p>
          </div>

          {/* Compte Bancaire */}
          <div className="mb-16 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="h-8 w-1 rounded-full bg-primary inline-block" />
              Compte Bancaire
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/offres/compte-personnel", Icon: CreditCardIcon, titre: "Compte Personnel", desc: "L'essentiel pour vos dépenses quotidiennes.", avantages: ["IBAN personnel", "Carte virtuelle", "Suivi des dépenses"], type: "personnel" },
                { href: "/offres/compte-business", Icon: BuildingOffice2Icon, titre: "Compte Business", desc: "Pour les entrepreneurs et professionnels.", avantages: ["Virements illimités", "Domiciliation bancaire", "Chéquier"], type: "courant", popular: true },
                { href: "/offres/carte-bancaire", Icon: SparklesIcon, titre: "Carte Bancaire", desc: "Visa classique ou Gold internationale.", avantages: ["Paiement sans contact", "Cashback 2 %", "Assurance voyage"], type: "premium" },
              ].map((offre) => (
                <div key={offre.href} className={`bg-card rounded-2xl p-7 border flex flex-col transition-all duration-200 hover:shadow-md relative ${offre.popular ? "border-2 border-primary shadow-md md:-translate-y-2" : "border-border"}`}>
                  {offre.popular && <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">Populaire</div>}
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-5 ${offre.popular ? "bg-primary" : "bg-primary/10"}`}>
                    <offre.Icon className={`h-6 w-6 ${offre.popular ? "text-white" : "text-primary"}`} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{offre.titre}</h4>
                  <p className="text-muted-foreground text-sm mb-5 flex-1">{offre.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {offre.avantages.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm">
                        <CheckCircleIcon className="h-4 w-4 text-primary shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 p-2.5 rounded-lg mb-5 text-sm font-medium">
                    <GiftIcon className="h-4 w-4 shrink-0" />
                    3 200 € offerts à l'ouverture
                  </div>
                  <Link href={offre.href}>
                    <Button className={`w-full ${offre.popular ? "bg-primary hover:bg-primary/90 text-white" : ""}`} variant={offre.popular ? "default" : "outline"}>
                      Découvrir l'offre
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Crédit Bancaire */}
          <div className="mb-16 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="h-8 w-1 rounded-full bg-secondary inline-block" />
              Crédit Bancaire
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/credits/pret-immobilier", Icon: HomeIcon, titre: "Prêt Immobilier", desc: "Financez l'acquisition de votre bien immobilier.", tag: "Dès 2,8 % annuel" },
                { href: "/credits/pret-personnel", Icon: BanknotesIcon, titre: "Prêt Personnel", desc: "Tous vos projets financés rapidement, sans justificatif.", tag: "Réponse sous 24h" },
                { href: "/credits/pret-auto", Icon: TruckIcon, titre: "Prêt Auto", desc: "Roulez maintenant, payez sereinement en mensualités fixes.", tag: "Jusqu'à 80 000 €" },
              ].map((c) => (
                <Link key={c.href} href={c.href} className="group bg-card rounded-2xl p-7 border border-border flex flex-col hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <c.Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{c.titre}</h4>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{c.desc}</p>
                  <span className="inline-block text-xs font-semibold text-secondary bg-blue-50 px-3 py-1 rounded-full mb-4">{c.tag}</span>
                  <span className="text-sm text-primary font-semibold group-hover:underline">En savoir plus →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Assurance Partenaire */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="h-8 w-1 rounded-full bg-purple-500 inline-block" />
              Assurance Partenaire
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
              {[
                { href: "/assurances/assurance-vie", Icon: ShieldCheckIcon, titre: "Assurance Vie", desc: "Préparez l'avenir et protégez vos proches avec un placement à long terme avantageux sur le plan fiscal.", tag: "Capital garanti" },
                { href: "/assurances/assurance-habitat", Icon: HomeModernIcon, titre: "Assurance Habitat", desc: "Couvrez votre logement contre tous les risques : incendie, dégât des eaux, vol et responsabilité civile.", tag: "Attestation immédiate" },
              ].map((a) => (
                <Link key={a.href} href={a.href} className="group bg-card rounded-2xl p-7 border border-border flex gap-5 items-start hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <a.Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{a.titre}</h4>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{a.desc}</p>
                    <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{a.tag}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { n: "1", Icon: CreditCardIcon, title: "Je crée mon compte", desc: "Remplissez le formulaire en 2 minutes." },
              { n: "2", Icon: LockClosedIcon, title: "Je vérifie mon identité", desc: "Déposez votre pièce d'identité en toute sécurité." },
              { n: "3", Icon: BanknotesIcon, title: "J'accède à mes fonds", desc: "Votre compte est activé par notre équipe dans les plus brefs délais." },
            ].map(({ n, Icon, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-4 relative">
                  <span className="text-2xl font-bold">{n}</span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS ── */}
      <section id="pourquoi" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Notre différence</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir NELLOA BANK ?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Une banque 100 % digitale, pensée pour vous simplifier la vie avec des garanties concrètes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { Icon: LockClosedIcon, title: "Sécurité bancaire", desc: "Chiffrement SSL 256 bits, authentification à deux facteurs et surveillance 24h/24." },
              { Icon: BoltIcon, title: "Ouverture en 3 min", desc: "Fini les rendez-vous en agence. Ouvrez votre compte entièrement en ligne, à toute heure." },
              { Icon: PhoneArrowUpRightIcon, title: "Support 7j/7", desc: "Notre équipe est disponible tous les jours pour répondre à vos questions." },
              { Icon: GlobeAltIcon, title: "Utilisable partout", desc: "Virements internationaux, carte acceptée dans le monde entier." },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-lg font-bold mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-2xl p-10 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Rejoignez des milliers de clients satisfaits</h3>
            <p className="text-white/80 mb-8">Ouvrez votre compte aujourd'hui et recevez 3 200 € sur votre solde dès l'activation.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-12 px-8 rounded-full">
                Ouvrir mon compte gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section id="temoignages" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Ils nous font confiance</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ce que disent nos clients</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col gap-5 hover:shadow-md transition-all duration-200"
                data-testid={`testimonial-card-${i}`}
              >
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="text-foreground leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">{t.initials}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Questions fréquentes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tout ce que vous devez savoir</h2>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Vous n'avez pas trouvé votre réponse ?</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Contacter le support</Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1E3A8A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-xl mb-3">NELLOA BANK</p>
              <p className="text-white/60 text-sm leading-relaxed">La banque digitale qui vous fait confiance. Ouvrez votre compte en 3 minutes.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3 text-white/90">Compte bancaire</p>
              <ul className="space-y-2">
                <li><Link href="/offres/compte-personnel" className="text-white/60 text-sm hover:text-white transition-colors">Compte Personnel</Link></li>
                <li><Link href="/offres/compte-business" className="text-white/60 text-sm hover:text-white transition-colors">Compte Business</Link></li>
                <li><Link href="/offres/carte-bancaire" className="text-white/60 text-sm hover:text-white transition-colors">Carte Bancaire</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3 text-white/90">Crédit Bancaire</p>
              <ul className="space-y-2">
                <li><Link href="/credits/pret-immobilier" className="text-white/60 text-sm hover:text-white transition-colors">Prêt Immobilier</Link></li>
                <li><Link href="/credits/pret-personnel" className="text-white/60 text-sm hover:text-white transition-colors">Prêt Personnel</Link></li>
                <li><Link href="/credits/pret-auto" className="text-white/60 text-sm hover:text-white transition-colors">Prêt Auto</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3 text-white/90">Assurance Partenaire</p>
              <ul className="space-y-2">
                <li><Link href="/assurances/assurance-vie" className="text-white/60 text-sm hover:text-white transition-colors">Assurance Vie</Link></li>
                <li><Link href="/assurances/assurance-habitat" className="text-white/60 text-sm hover:text-white transition-colors">Assurance Habitat</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2025 NELLOA BANK. Tous droits réservés.</p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
