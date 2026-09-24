"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getUserByEmail, setSession } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { useTranslations, useLocale } from "next-intl"

export default function LoginPage() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    setTimeout(() => {
      const user = getUserByEmail(email)
      if (user && user.password === password) {
        setSession(user.id)
        router.push(`/${locale}/dashboard`)
      } else {
        setError(t("erreur"))
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground">{t("titre")}</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-12 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium text-center">{error}</div>}
              <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                {isLoading ? t("loading") : t("submit")}
              </Button>
            </form>
            <div className="mt-8 text-center text-sm">
              <span className="text-muted-foreground">{t("pasDeCompte")} </span>
              <Link href={`/${locale}/register`} className="text-primary font-medium hover:underline">{t("sInscrire")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
