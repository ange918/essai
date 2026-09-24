"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CreditCardIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BanknotesIcon, TruckIcon, ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/outline"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"

function DropdownMenu({ label, items }: { label: string; items: Array<{ label: string; href: string; Icon: React.ElementType; desc: string }> }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
        {label}<ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
          {items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-start gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                <item.Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/")
    segments[1] = newLocale
    router.push(segments.join("/"))
    setOpen(false)
  }

  const flags: Record<string, string> = { fr: "🇫🇷", pl: "🇵🇱" }
  const labels: Record<string, string> = { fr: "FR", pl: "PL" }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors border border-border rounded-lg px-2.5 py-1.5">
        <Globe className="h-4 w-4" />
        <span>{flags[locale]} {labels[locale]}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-28 bg-white rounded-xl shadow-lg border border-border z-50 overflow-hidden">
          {["fr", "pl"].map((loc) => (
            <button key={loc} onClick={() => switchLocale(loc)} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-primary/5 transition-colors ${locale === loc ? "font-bold text-primary" : "text-foreground"}`}>
              <span>{flags[loc]}</span>
              <span>{labels[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navMenus = [
    { label: t("comptesBancaires"), items: [
      { label: t("comptePersonnel"), href: `/${locale}/offres/compte-personnel`, Icon: CreditCardIcon, desc: t("comptePersonnelDesc") },
      { label: t("compteBusiness"), href: `/${locale}/offres/compte-business`, Icon: BuildingOffice2Icon, desc: t("compteBusinessDesc") },
      { label: t("carteBancaire"), href: `/${locale}/offres/carte-bancaire`, Icon: SparklesIcon, desc: t("carteBancaireDesc") },
    ]},
    { label: t("creditBancaire"), items: [
      { label: t("pretImmobilier"), href: `/${locale}/credits/pret-immobilier`, Icon: HomeIcon, desc: t("pretImmobilierDesc") },
      { label: t("pretPersonnel"), href: `/${locale}/credits/pret-personnel`, Icon: BanknotesIcon, desc: t("pretPersonnelDesc") },
      { label: t("pretAuto"), href: `/${locale}/credits/pret-auto`, Icon: TruckIcon, desc: t("pretAutoDesc") },
    ]},
    { label: t("assurancePartenaire"), items: [
      { label: t("assuranceVie"), href: `/${locale}/assurances/assurance-vie`, Icon: ShieldCheckIcon, desc: t("assuranceVieDesc") },
      { label: t("assuranceHabitat"), href: `/${locale}/assurances/assurance-habitat`, Icon: HomeModernIcon, desc: t("assuranceHabitatDesc") },
    ]},
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-bold text-xl text-primary">NELLOA BANK</Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navMenus.map((m) => <DropdownMenu key={m.label} label={m.label} items={m.items} />)}
          <Link href={`/${locale}/#pourquoi`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{t("pourquoiNous")}</Link>
          <Link href={`/${locale}/#faq`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{t("faq")}</Link>
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link href={`/${locale}/login`}><Button variant="outline" className="border-primary text-primary hover:bg-primary/5">{t("connexion")}</Button></Link>
          <Link href={`/${locale}/register`}><Button>{t("ouvrirCompte")}</Button></Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-0 pt-10 overflow-y-auto">
              {navMenus.map((m) => (
                <div key={m.label} className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">{m.label}</p>
                  {m.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-2 py-2.5 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
                      <item.Icon className="h-4 w-4 text-primary" />{item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-border pt-4 flex flex-col gap-3 mt-2">
                <Link href={`/${locale}/login`} onClick={() => setIsMenuOpen(false)}><Button variant="outline" className="w-full border-primary text-primary">{t("connexion")}</Button></Link>
                <Link href={`/${locale}/register`} onClick={() => setIsMenuOpen(false)}><Button className="w-full">{t("ouvrirCompte")}</Button></Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
