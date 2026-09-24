"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { v4 as uuidv4 } from "uuid"
import { CreditCard, Building, Star, CheckCircle2, Upload, Eye, EyeOff, ShieldCheck, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { saveUsers, getUsers, setSession, getUserByEmail } from "@/lib/storage"
import { Navbar } from "@/components/Navbar"
import { Suspense } from "react"
import { useTranslations, useLocale } from "next-intl"

function calcAge(dob: string): number {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const infoSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string().min(1).refine((val) => calcAge(val) >= 18),
  phone: z.string().min(10),
  email: z.string().email(),
  password: z.string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
  confirmPassword: z.string()
}).refine((d) => d.password === d.confirmPassword, { path: ["confirmPassword"] })

type InfoFormValues = z.infer<typeof infoSchema>
type AccountType = "personnel" | "courant" | "premium"

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+", ok: password.length >= 8 },
    { label: "A-Z", ok: /[A-Z]/.test(password) },
    { label: "a-z", ok: /[a-z]/.test(password) },
    { label: "0-9", ok: /[0-9]/.test(password) },
    { label: "#@!", ok: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const color = score <= 2 ? "bg-red-500" : score <= 3 ? "bg-orange-400" : score === 4 ? "bg-yellow-400" : "bg-green-500"
  if (!password) return null
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 items-center">
        {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= score ? color : "bg-slate-200"}`} />)}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {checks.map(c => (
          <span key={c.label} className={`flex items-center gap-1 text-xs ${c.ok ? "text-green-600" : "text-slate-400"}`}>
            {c.ok ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}{c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function RegisterForm() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("register")
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<AccountType>("courant")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [idDocument, setIdDocument] = useState("")
  const [idDocumentName, setIdDocumentName] = useState("")
  const [idDocumentError, setIdDocumentError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "personnel" || type === "courant" || type === "premium") setAccountType(type)
  }, [searchParams])

  const form = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: { firstName: "", lastName: "", dateOfBirth: "", phone: "", email: "", password: "", confirmPassword: "" },
  })

  const passwordValue = form.watch("password")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) { setIdDocumentError(t("erreurImage")); return }
    if (file.size > 5 * 1024 * 1024) { setIdDocumentError(t("erreurTaille")); return }
    setIdDocumentError("")
    const reader = new FileReader()
    reader.onload = (ev) => { setIdDocument(ev.target?.result as string); setIdDocumentName(file.name) }
    reader.readAsDataURL(file)
  }

  const onInfoSubmit = (data: InfoFormValues) => {
    if (!idDocument) { setIdDocumentError(t("erreurPiece")); return }
    if (getUserByEmail(data.email)) { form.setError("email", { message: t("erreurEmail") }); return }
    setStep(2)
  }

  const handleFinalSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const data = form.getValues()
      const id = uuidv4()
      const newUser = {
        id, firstName: data.firstName, lastName: data.lastName, dateOfBirth: data.dateOfBirth,
        phone: data.phone, email: data.email, password: data.password, accountType,
        balance: 3200, currency: "EUR", status: "blocked" as const, kycStatus: "pending" as const,
        idDocument, createdAt: new Date().toISOString()
      }
      const users = getUsers()
      users.push(newUser)
      saveUsers(users)
      setSession(id)
      router.push(`/${locale}/dashboard`)
    }, 1500)
  }

  const accounts = [
    { type: "personnel" as AccountType, Icon: CreditCard, title: t("personnel"), items: t.raw("personnelItems") as string[] },
    { type: "courant" as AccountType, Icon: Building, title: t("courant"), items: t.raw("courantItems") as string[] },
    { type: "premium" as AccountType, Icon: Star, title: t("premium"), items: t.raw("premiumItems") as string[] },
  ]

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
            <div className="absolute left-0 top-1/2 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }} />
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= num ? "bg-primary text-white" : "bg-slate-200 text-slate-500"}`}>
                  {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
                </div>
                <span className={`text-xs md:text-sm font-medium ${step >= num ? "text-foreground" : "text-muted-foreground"}`}>
                  {num === 1 ? t("etape1") : num === 2 ? t("etape2") : t("etape3")}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("titreInfo")}</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInfoSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>{t("prenom")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>{t("nom")}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("dateNaissance")}</FormLabel>
                        <FormControl>
                          <Input type="date" max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]} {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">{t("dateNaissanceNote")}</p>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>{t("email")}</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>{t("telephone")}</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("motDePasse")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} {...field} className="pr-10" />
                              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <PasswordStrength password={passwordValue} />
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("confirmerMdp")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showConfirm ? "text" : "password"} {...field} className="pr-10" />
                              <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("pieceIdentite")} <span className="text-muted-foreground font-normal">{t("pieceIdentiteNote")}</span></label>
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      {!idDocument ? (
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                          <Upload className="h-8 w-8 text-slate-400" />
                          <div className="text-center">
                            <p className="font-medium text-slate-700">{t("uploadBtn")}</p>
                            <p className="text-sm text-muted-foreground mt-1">{t("uploadNote")}</p>
                          </div>
                        </button>
                      ) : (
                        <div className="border-2 border-green-400 bg-green-50 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                            <div>
                              <p className="font-medium text-green-800 text-sm">{t("pieceTelechargee")}</p>
                              <p className="text-xs text-green-600 truncate max-w-[200px]">{idDocumentName}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => { setIdDocument(""); setIdDocumentName(""); if (fileInputRef.current) fileInputRef.current.value = "" }} className="text-sm text-red-500 hover:underline ml-4 shrink-0">{t("supprimer")}</button>
                        </div>
                      )}
                      {idDocumentError && <p className="text-sm text-destructive mt-2">{idDocumentError}</p>}
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button type="submit" size="lg">{t("suivant")}</Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("titreCompte")}</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {accounts.map(({ type, Icon, title, items }) => (
                    <div key={type} className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${accountType === type ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50"}`} onClick={() => setAccountType(type)}>
                      <Icon className={`h-8 w-8 mb-4 ${accountType === type ? "text-primary" : "text-muted-foreground"}`} />
                      <h3 className="font-bold text-lg mb-2">{title}</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">{items.map((item: string) => <li key={item}>• {item}</li>)}</ul>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} size="lg">{t("precedent")}</Button>
                  <Button onClick={() => setStep(3)} size="lg">{t("suivant")}</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{t("titreRecap")}</h2>
                <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground mb-1">{t("titulaire")}</p><p className="font-medium">{form.getValues().firstName} {form.getValues().lastName}</p></div>
                    <div><p className="text-sm text-muted-foreground mb-1">{t("dateNaissanceLabel")}</p><p className="font-medium">{new Date(form.getValues().dateOfBirth).toLocaleDateString(locale === "pl" ? "pl-PL" : "fr-FR")}</p></div>
                  </div>
                  <div className="h-px bg-slate-200 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground mb-1">{t("email")}</p><p className="font-medium">{form.getValues().email}</p></div>
                    <div><p className="text-sm text-muted-foreground mb-1">{t("telephone")}</p><p className="font-medium">{form.getValues().phone}</p></div>
                  </div>
                  <div className="h-px bg-slate-200 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground mb-1">{t("typeCompte")}</p><p className="font-medium capitalize">{accountType}</p></div>
                    <div><p className="text-sm text-muted-foreground mb-1">{t("soldeInitial")}</p><p className="font-bold text-green-600 text-lg">3 200,00 €</p></div>
                  </div>
                  <div className="h-px bg-slate-200 w-full" />
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    <div><p className="text-sm text-muted-foreground">{t("pieceIdentite")}</p><p className="font-medium text-green-700 text-sm">{idDocumentName} — {t("pieceTelechargee")} ✓</p></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)} size="lg" disabled={isSubmitting}>{t("precedent")}</Button>
                  <Button onClick={handleFinalSubmit} size="lg" disabled={isSubmitting} className="min-w-[180px]">
                    {isSubmitting ? t("creation") : t("creer")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t("dejaCompte")} </span>
            <Link href={`/${locale}/login`} className="text-primary font-medium hover:underline">{t("seConnecter")}</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
