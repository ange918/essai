"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CreditCardIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BanknotesIcon, TruckIcon, ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/outline"

const navMenus = [
  { label: "Compte bancaire", items: [
    { label: "Compte Personnel", href: "/offres/compte-personnel", Icon: CreditCardIcon, desc: "L'essentiel au quotidien" },
    { label: "Compte Business", href: "/offres/compte-business", Icon: BuildingOffice2Icon, desc: "Pour les professionnels" },
    { label: "Carte Bancaire", href: "/offres/carte-bancaire", Icon: SparklesIcon, desc: "Visa & Gold internationale" },
  ]},
  { label: "Crédit Bancaire", items: [
    { label: "Prêt Immobilier", href: "/credits/pret-immobilier", Icon: HomeIcon, desc: "Financez votre bien" },
    { label: "Prêt Personnel", href: "/credits/pret-personnel", Icon: BanknotesIcon, desc: "Tous vos projets" },
    { label: "Prêt Auto", href: "/credits/pret-auto", Icon: TruckIcon, desc: "Roulez sereinement" },
  ]},
  { label: "Assurance Partenaire", items: [
    { label: "Assurance Vie", href: "/assurances/assurance-vie", Icon: ShieldCheckIcon, desc: "Protégez vos proches" },
    { label: "Assurance Habitat", href: "/assurances/assurance-habitat", Icon: HomeModernIcon, desc: "Votre logement à 360°" },
  ]},
]

function DropdownMenu({ label, items }: { label: string; items: typeof navMenus[0]["items"] }) {
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

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary">NELLOA BANK</Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navMenus.map((m) => <DropdownMenu key={m.label} label={m.label} items={m.items} />)}
          <Link href="/#pourquoi" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Pourquoi nous</Link>
          <Link href="/#faq" className="text-sm font-medium text-foreground hover:text-primary transition-colors">FAQ</Link>
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login"><Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Connexion</Button></Link>
          <Link href="/register"><Button>Ouvrir un compte</Button></Link>
        </div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-6 w-6" /></Button>
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
              <Link href="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" className="w-full border-primary text-primary">Connexion</Button></Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}><Button className="w-full">Ouvrir un compte</Button></Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
