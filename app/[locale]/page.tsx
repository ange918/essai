"use client"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Quote, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { useTranslations, useLocale } from "next-intl"
import { CreditCardIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BanknotesIcon, TruckIcon, ShieldCheckIcon, SparklesIcon, GiftIcon, LockClosedIcon, BoltIcon, PhoneArrowUpRightIcon, GlobeAltIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors duration-200">
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open ? <ChevronUp className="h-5 w-5 text-primary shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 bg-card border-t border-border"><p className="pt-4 text-muted-foreground text-sm leading-relaxed">{answer}</p></div>}
    </div>
  )
}

const testimonials = [
  { name: "Amara Diallo", role: "Entrepreneur", text: "NELLOA BANK a transformé ma façon de gérer mes finances. L'ouverture de compte a été ultra rapide et la prime de bienvenue est réelle. Je recommande !", initials: "AD" },
  { name: "Sophie Martin", role: "Freelance Designer", text: "Le tableau de bord est clair et intuitif. Fini les frais cachés, fini les longues attentes. Mon compte courant NELLOA m'a simplifié la vie au quotidien.", initials: "SM" },
  { name: "Kouassi Bamba", role: "Responsable commercial", text: "Le compte Premium vaut vraiment son nom. Mon conseiller dédié répond en moins d'une heure et le cashback 2 % m'a fait économiser plusieurs centaines d'euros.", initials: "KB" },
]

const testimonialspl = [
  { name: "Amara Diallo", role: "Przedsiębiorca", text: "NELLOA BANK zmienił sposób, w jaki zarządzam swoimi finansami. Otwarcie konta było ultra szybkie i premia powitalna jest prawdziwa. Polecam!", initials: "AD" },
  { name: "Sophie Martin", role: "Freelance Designer", text: "Panel jest przejrzysty i intuicyjny. Koniec z ukrytymi opłatami, koniec z długim oczekiwaniem. Moje konto NELLOA uprościło moje codzienne życie.", initials: "SM" },
  { name: "Kouassi Bamba", role: "Kierownik handlowy", text: "Konto Premium naprawdę zasługuje na swoją nazwę. Mój dedykowany doradca odpowiada w mniej niż godzinę, a cashback 2% pozwolił mi zaoszczędzić kilkaset euro.", initials: "KB" },
]

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale()
  const currentTestimonials = locale === "pl" ? testimonialspl : testimonials

  const faqs = [
    { question: t("faqSection.q1"), answer: t("faqSection.a1") },
    { question: t("faqSection.q2"), answer: t("faqSection.a2") },
    { question: t("faqSection.q3"), answer: t("faqSection.a3") },
    { question: t("faqSection.q4"), answer: t("faqSection.a4") },
    { question: t("faqSection.q5"), answer: t("faqSection.a5") },
    { question: t("faqSection.q6"), answer: t("faqSection.a6") },
  ]

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center justify-center min-h-[680px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/90 via-[#1E3A8A]/80 to-[#3B82F6]/75" />
        <div className="container relative z-10 px-4 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl mx-auto tracking-tight">{t("hero.titre")}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">{t("hero.sousTitre")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register"><Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-base h-14 px-8 rounded-full shadow-lg">{t("hero.commencer")}</Button></Link>
              <a href="#offres"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 rounded-full">{t("hero.voirOffres")}</Button></a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("offres.titre")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("offres.sousTitre")}</p>
          </div>

          <div className="mb-16 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"><span className="h-8 w-1 rounded-full bg-primary inline-block" />{t("offres.compteBancaire")}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/offres/compte-personnel", Icon: CreditCardIcon, titre: t("nav.comptePersonnel"), desc: t("offres.comptePersonnelDesc"), avantages: [t("offres.avantages.iban"), t("offres.avantages.carteVirtuelle"), t("offres.avantages.suiviDepenses")], popular: false },
                { href: "/offres/compte-business", Icon: BuildingOffice2Icon, titre: t("nav.compteBusiness"), desc: t("offres.compteBusinessDesc"), avantages: [t("offres.avantages.virementsIllimites"), t("offres.avantages.domiciliation"), t("offres.avantages.chequier")], popular: true },
                { href: "/offres/carte-bancaire", Icon: SparklesIcon, titre: t("nav.carteBancaire"), desc: t("offres.carteBancaireDesc"), avantages: [t("offres.avantages.paiementSansContact"), t("offres.avantages.cashback"), t("offres.avantages.assuranceVoyage")], popular: false },
              ].map((offre) => (
                <div key={offre.href} className={`bg-card rounded-2xl p-7 border flex flex-col transition-all duration-200 hover:shadow-md relative ${offre.popular ? "border-2 border-primary shadow-md md:-translate-y-2" : "border-border"}`}>
                  {offre.popular && <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">{t("offres.populaire")}</div>}
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-5 ${offre.popular ? "bg-primary" : "bg-primary/10"}`}>
                    <offre.Icon className={`h-6 w-6 ${offre.popular ? "text-white" : "text-primary"}`} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{offre.titre}</h4>
                  <p className="text-muted-foreground text-sm mb-5 flex-1">{offre.desc}</p>
                  <ul className="space-y-2 mb-6">{offre.avantages.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><CheckCircleIcon className="h-4 w-4 text-primary shrink-0" />{a}</li>)}</ul>
                  <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 p-2.5 rounded-lg mb-5 text-sm font-medium"><GiftIcon className="h-4 w-4 shrink-0" />{t("offres.prime")}</div>
                  <Link href={offre.href}><Button className="w-full" variant={offre.popular ? "default" : "outline"}>{t("offres.decouvrir")}</Button></Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"><span className="h-8 w-1 rounded-full bg-secondary inline-block" />{t("offres.creditBancaire")}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/credits/pret-immobilier", Icon: HomeIcon, titre: t("nav.pretImmobilier"), desc: t("offres.pretImmobilierDesc"), tag: t("offres.tags.immobilier") },
                { href: "/credits/pret-personnel", Icon: BanknotesIcon, titre: t("nav.pretPersonnel"), desc: t("offres.pretPersonnelDesc"), tag: t("offres.tags.personnel") },
                { href: "/credits/pret-auto", Icon: TruckIcon, titre: t("nav.pretAuto"), desc: t("offres.pretAutoDesc"), tag: t("offres.tags.auto") },
              ].map((c) => (
                <Link key={c.href} href={c.href} className="group bg-card rounded-2xl p-7 border border-border flex flex-col hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"><c.Icon className="h-6 w-6 text-primary" /></div>
                  <h4 className="text-xl font-bold mb-2">{c.titre}</h4>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{c.desc}</p>
                  <span className="inline-block text-xs font-semibold text-secondary bg-blue-50 px-3 py-1 rounded-full mb-4">{c.tag}</span>
                  <span className="text-sm text-primary font-semibold group-hover:underline">{t("offres.enSavoirPlus")}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"><span className="h-8 w-1 rounded-full bg-purple-500 inline-block" />{t("offres.assurancePartenaire")}</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
              {[
                { href: "/assurances/assurance-vie", Icon: ShieldCheckIcon, titre: t("nav.assuranceVie"), desc: t("offres.assuranceVieDesc"), tag: t("offres.capitalGaranti") },
                { href: "/assurances/assurance-habitat", Icon: HomeModernIcon, titre: t("nav.assuranceHabitat"), desc: t("offres.assuranceHabitatDesc"), tag: t("offres.attestationImmediate") },
              ].map((a) => (
                <Link key={a.href} href={a.href} className="group bg-card rounded-2xl p-7 border border-border flex gap-5 items-start hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"><a.Icon className="h-6 w-6 text-primary" /></div>
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

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("comment.titre")}</h2></div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { n: "1", Icon: CreditCardIcon, title: t("comment.etape1"), desc: t("comment.etape1Desc") },
              { n: "2", Icon: LockClosedIcon, title: t("comment.etape2"), desc: t("comment.etape2Desc") },
              { n: "3", Icon: BanknotesIcon, title: t("comment.etape3"), desc: t("comment.etape3Desc") },
            ].map(({ n, Icon, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-4"><span className="text-2xl font-bold">{n}</span></div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon className="h-5 w-5 text-primary" /></div>
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section id="pourquoi" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{t("pourquoi.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pourquoi.titre")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { Icon: LockClosedIcon, title: t("pourquoi.securite"), desc: t("pourquoi.securiteDesc") },
              { Icon: BoltIcon, title: t("pourquoi.ouverture"), desc: t("pourquoi.ouvertureDesc") },
              { Icon: PhoneArrowUpRightIcon, title: t("pourquoi.support"), desc: t("pourquoi.supportDesc") },
              { Icon: GlobeAltIcon, title: t("pourquoi.mondial"), desc: t("pourquoi.mondialDesc") },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5"><Icon className="h-7 w-7 text-primary" /></div>
                <h4 className="text-lg font-bold mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-2xl p-10 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("pourquoi.cta")}</h3>
            <p className="text-white/80 mb-8">{t("pourquoi.ctaDesc")}</p>
            <Link href="/register"><Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-12 px-8 rounded-full">{t("pourquoi.ctaBtn")}</Button></Link>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{t("temoignages.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("temoignages.titre")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentTestimonials.map((testimonial, i) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col gap-5 hover:shadow-md transition-all duration-200">
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="text-foreground leading-relaxed flex-1">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">{testimonial.initials}</div>
                  <div><p className="font-semibold text-foreground text-sm">{testimonial.name}</p><p className="text-muted-foreground text-xs">{testimonial.role}</p></div>
                  <div className="ml-auto flex gap-0.5">{[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
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
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{t("faqSection.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("faqSection.titre")}</h2>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{t("faqSection.contactQuestion")}</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">{t("faqSection.contactBtn")}</Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E3A8A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-xl mb-3">NELLOA BANK</p>
              <p className="text-white/60 text-sm leading-relaxed">{t("footer.desc")}</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3 text-white/90">{t("footer.compteBancaire")}</p>
              <ul className="space-y-2">
                <li><Link href="/offres/compte-personnel" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.comptePersonnel")}</Link></li>
                <li><Link href="/offres/compte-business" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.compteBusiness")}</Link></li>
                <li><Link href="/offres/carte-bancaire" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.carteBancaire")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3 text-white/90">{t("footer.creditBancaire")}</p>
              <ul className="space-y-2">
                <li><Link href="/credits/pret-immobilier" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.pretImmobilier")}</Link></li>
                <li><Link href="/credits/pret-personnel" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.pretPersonnel")}</Link></li>
                <li><Link href="/credits/pret-auto" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.pretAuto")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3 text-white/90">{t("footer.assurancePartenaire")}</p>
              <ul className="space-y-2">
                <li><Link href="/assurances/assurance-vie" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.assuranceVie")}</Link></li>
                <li><Link href="/assurances/assurance-habitat" className="text-white/60 text-sm hover:text-white transition-colors">{t("nav.assuranceHabitat")}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">{t("footer.droits")}</p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">{t("footer.mentionsLegales")}</a>
              <a href="#" className="hover:text-white transition-colors">{t("footer.contact")}</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
