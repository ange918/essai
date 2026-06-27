import { motion } from "framer-motion";
import { CreditCard, Building, Star, Menu, ShieldCheck, Zap, HeadphonesIcon, Globe, ChevronDown, ChevronUp, Quote } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const faqs = [
  {
    question: "Combien de temps faut-il pour ouvrir un compte ?",
    answer: "L'ouverture de votre compte prend moins de 3 minutes. Remplissez le formulaire en ligne, déposez votre pièce d'identité, et notre équipe active votre compte sous 24h."
  },
  {
    question: "Comment fonctionne la prime de bienvenue de 3 200 € ?",
    answer: "Dès l'activation de votre compte par notre équipe, la prime de 3 200 € est créditée directement sur votre solde. Elle est disponible immédiatement pour vos transactions."
  },
  {
    question: "Quels documents sont nécessaires pour la vérification d'identité ?",
    answer: "Nous acceptons les cartes nationales d'identité, passeports et titres de séjour en cours de validité. Les fichiers acceptés sont JPG, PNG et PDF (max 10 Mo)."
  },
  {
    question: "Mon argent est-il en sécurité chez NELLOA BANK ?",
    answer: "Oui, absolument. NELLOA BANK utilise un chiffrement bancaire de niveau militaire (SSL 256 bits) et une authentification à deux facteurs pour protéger votre compte."
  },
  {
    question: "Puis-je changer de type de compte après l'ouverture ?",
    answer: "Oui. Vous pouvez faire une demande de changement de formule depuis votre espace client ou en contactant notre service client. La transition se fait sans interruption de service."
  },
  {
    question: "Comment contacter le service client ?",
    answer: "Notre équipe est disponible 7j/7 par email et par chat en direct depuis votre espace client. Les titulaires d'un compte Premium bénéficient d'un conseiller dédié joignable directement."
  }
];

const testimonials = [
  {
    name: "Amara Diallo",
    role: "Entrepreneur",
    text: "NELLOA BANK a transformé ma façon de gérer mes finances. L'ouverture de compte a été ultra rapide et la prime de bienvenue est réelle. Je recommande !",
    initials: "AD"
  },
  {
    name: "Sophie Martin",
    role: "Freelance Designer",
    text: "Le tableau de bord est clair et intuitif. Fini les frais cachés, fini les longues attentes. Mon compte courant NELLOA m'a simplifié la vie au quotidien.",
    initials: "SM"
  },
  {
    name: "Kouassi Bamba",
    role: "Responsable commercial",
    text: "Le compte Premium vaut vraiment son nom. Mon conseiller dédié répond en moins d'une heure et le cashback 2% m'a fait économiser plusieurs centaines d'euros en un mois.",
    initials: "KB"
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        data-testid={`faq-toggle-${question.slice(0, 20)}`}
        className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors duration-200"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-primary shrink-0" />
          : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed bg-card border-t border-border">
          <p className="pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
            NELLOA BANK
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#offres" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Nos Offres</a>
            <a href="#pourquoi" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Pourquoi nous</a>
            <a href="#temoignages" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Témoignages</a>
            <a href="#faq" className="text-sm font-medium text-foreground hover:text-primary transition-colors">FAQ</a>
            <Link href="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Ouvrir un compte</Button>
            </Link>
          </nav>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12">
              <a href="#offres" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">Nos Offres</a>
              <a href="#pourquoi" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">Pourquoi nous</a>
              <a href="#temoignages" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">Témoignages</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">FAQ</a>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">
                Connexion
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground">Ouvrir un compte</Button>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex-1 flex items-center justify-center min-h-[600px] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative z-10 px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl mx-auto tracking-tight">
              La banque qui vous fait confiance
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Ouvrez votre compte en 3 minutes et accédez à votre espace sécurisé.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-base h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Commencer maintenant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OFFRES SECTION */}
      <section id="offres" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos Offres</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Des comptes adaptés à vos besoins, avec une prime de bienvenue exceptionnelle.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Compte Personnel</h3>
              <p className="text-muted-foreground mb-6">L'essentiel pour vos dépenses quotidiennes.</p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> IBAN personnel</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Carte virtuelle</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Suivi des dépenses</li>
              </ul>
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-center font-medium text-sm">
                3 200 € offerts à l'ouverture
              </div>
              <Link href="/register?type=personnel">
                <Button variant="outline" className="w-full">Choisir cette offre</Button>
              </Link>
            </div>

            <div className="bg-card rounded-2xl p-8 border-2 border-primary shadow-lg flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Populaire
              </div>
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Compte Courant</h3>
              <p className="text-muted-foreground mb-6">Pour une gestion complète de vos finances.</p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Virements illimités</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Domiciliation bancaire</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Chéquier</li>
              </ul>
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-center font-medium text-sm">
                3 200 € offerts à l'ouverture
              </div>
              <Link href="/register?type=courant">
                <Button className="w-full bg-primary hover:bg-primary/90">Choisir cette offre</Button>
              </Link>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Compte Premium</h3>
              <p className="text-muted-foreground mb-6">L'excellence bancaire sans compromis.</p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Conseiller dédié</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Cashback 2%</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Carte Gold internationale</li>
              </ul>
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-center font-medium text-sm">
                3 200 € offerts à l'ouverture
              </div>
              <Link href="/register?type=premium">
                <Button variant="outline" className="w-full">Choisir cette offre</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">1</div>
              <h4 className="text-xl font-bold mb-2">Je crée mon compte</h4>
              <p className="text-muted-foreground">Remplissez le formulaire en 2 minutes.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">2</div>
              <h4 className="text-xl font-bold mb-2">Je vérifie mon identité</h4>
              <p className="text-muted-foreground">Déposez votre pièce d'identité en toute sécurité.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">3</div>
              <h4 className="text-xl font-bold mb-2">J'accède à mes fonds</h4>
              <p className="text-muted-foreground">Votre compte est activé par notre équipe dans les plus brefs délais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section id="pourquoi" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Notre différence</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pourquoi choisir NELLOA BANK ?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une banque 100 % digitale, pensée pour vous simplifier la vie avec des garanties concrètes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-lg font-bold mb-2">Sécurité bancaire</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Chiffrement SSL 256 bits, authentification à deux facteurs et surveillance 24h/24 pour protéger vos fonds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-lg font-bold mb-2">Ouverture en 3 min</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fini les rendez-vous en agence. Ouvrez votre compte entièrement en ligne, à toute heure, depuis n'importe quel appareil.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <HeadphonesIcon className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-lg font-bold mb-2">Support 7j/7</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Notre équipe est disponible tous les jours pour répondre à vos questions et vous accompagner à chaque étape.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-lg font-bold mb-2">Utilisable partout</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Virements internationaux, carte acceptée dans le monde entier. Votre banque vous suit où que vous alliez.
              </p>
            </motion.div>
          </div>

          {/* CTA band */}
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

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Ils nous font confiance</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ce que disent nos clients</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Des milliers de personnes ont déjà choisi NELLOA BANK pour gérer leur argent au quotidien.
            </p>
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
                  <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Questions fréquentes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tout ce que vous devez savoir</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vous avez d'autres questions ? Notre équipe est disponible 7j/7 pour vous répondre.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Vous n'avez pas trouvé votre réponse ?</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Contacter le support
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E3A8A] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-xl mb-4">NELLOA BANK</p>
          <p className="mb-4 text-white/80">© 2025 NELLOA BANK. Tous droits réservés.</p>
          <div className="flex justify-center gap-6 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
