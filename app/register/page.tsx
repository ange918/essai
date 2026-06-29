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

function calcAge(dob: string): number {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const infoSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  dateOfBirth: z.string().min(1, "Date de naissance requise").refine((val) => calcAge(val) >= 18, "Vous devez avoir au moins 18 ans"),
  phone: z.string().min(10, "Téléphone invalide"),
  email: z.string().email("Email invalide"),
  password: z.string()
    .min(8, "8 caractères minimum")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[a-z]/, "Au moins une minuscule")
    .regex(/[0-9]/, "Au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Au moins un caractère spécial"),
  confirmPassword: z.string()
}).refine((d) => d.password === d.confirmPassword, { message: "Les mots de passe ne correspondent pas", path: ["confirmPassword"] })

type InfoFormValues = z.infer<typeof infoSchema>
type AccountType = "personnel" | "courant" | "premium"

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8 car. min.", ok: password.length >= 8 },
    { label: "Majuscule", ok: /[A-Z]/.test(password) },
    { label: "Minuscule", ok: /[a-z]/.test(password) },
    { label: "Chiffre", ok: /[0-9]/.test(password) },
    { label: "Spécial", ok: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const color = score <= 2 ? "bg-red-500" : score <= 3 ? "bg-orange-400" : score === 4 ? "bg-yellow-400" : "bg-green-500"
  const label = score <= 2 ? "Faible" : score <= 3 ? "Moyen" : score === 4 ? "Fort" : "Très fort"
  if (!password) return null
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 items-center">
        {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= score ? color : "bg-slate-200"}`} />)}
        <span className={`text-xs font-medium ml-2 ${score <= 2 ? "text-red-500" : score <= 3 ? "text-orange-500" : score === 4 ? "text-yellow-600" : "text-green-600"}`}>{label}</span>
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
    if (!file.type.startsWith("image/")) { setIdDocumentError("Veuillez sélectionner une image (JPG, PNG, etc.)"); return }
    if (file.size > 5 * 1024 * 1024) { setIdDocumentError("L'image ne doit pas dépasser 5 Mo"); return }
    setIdDocumentError("")
    const reader = new FileReader()
    reader.onload = (ev) => { setIdDocument(ev.target?.result as string); setIdDocumentName(file.name) }
    reader.readAsDataURL(file)
  }

  const onInfoSubmit = (data: InfoFormValues) => {
    if (!idDocument) { setIdDocumentError("Veuillez télécharger une pièce d'identité valide"); return }
    if (getUserByEmail(data.email)) { form.setError("email", { message: "Cet email est déjà utilisé" }); return }
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
      router.push("/dashboard")
    }, 1500)
  }

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
                  {num === 1 ? "Informations" : num === 2 ? "Compte" : "Récapitulatif"}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Vos informations personnelles</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInfoSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>Prénom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Nom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de naissance</FormLabel>
                        <FormControl>
                          <Input type="date" max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]} {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">Vous devez avoir au moins 18 ans.</p>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe</FormLabel>
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
                          <FormLabel>Confirmer le mot de passe</FormLabel>
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
                      <label className="block text-sm font-medium mb-2">Pièce d&apos;identité <span className="text-muted-foreground font-normal">(CNI, passeport, titre de séjour)</span></label>
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      {!idDocument ? (
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                          <Upload className="h-8 w-8 text-slate-400" />
                          <div className="text-center">
                            <p className="font-medium text-slate-700">Cliquez pour télécharger votre pièce d&apos;identité</p>
                            <p className="text-sm text-muted-foreground mt-1">JPG, PNG — 5 Mo maximum</p>
                          </div>
                        </button>
                      ) : (
                        <div className="border-2 border-green-400 bg-green-50 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                            <div>
                              <p className="font-medium text-green-800 text-sm">Pièce d&apos;identité téléchargée</p>
                              <p className="text-xs text-green-600 truncate max-w-[200px]">{idDocumentName}</p>
                            </div>
                          </div>
                          <button type="button" onClick={() => { setIdDocument(""); setIdDocumentName(""); if (fileInputRef.current) fileInputRef.current.value = "" }} className="text-sm text-red-500 hover:underline ml-4 shrink-0">Supprimer</button>
                        </div>
                      )}
                      {idDocumentError && <p className="text-sm text-destructive mt-2">{idDocumentError}</p>}
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button type="submit" size="lg">Suivant</Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Choisissez votre compte</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { type: "personnel" as AccountType, Icon: CreditCard, title: "Personnel", items: ["IBAN personnel", "Carte virtuelle"] },
                    { type: "courant" as AccountType, Icon: Building, title: "Courant", items: ["Virements illimités", "Chéquier disponible"] },
                    { type: "premium" as AccountType, Icon: Star, title: "Premium", items: ["Conseiller dédié", "Cashback 2%"] },
                  ].map(({ type, Icon, title, items }) => (
                    <div key={type} className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${accountType === type ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50"}`} onClick={() => setAccountType(type)}>
                      <Icon className={`h-8 w-8 mb-4 ${accountType === type ? "text-primary" : "text-muted-foreground"}`} />
                      <h3 className="font-bold text-lg mb-2">{title}</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">{items.map(i => <li key={i}>• {i}</li>)}</ul>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} size="lg">Précédent</Button>
                  <Button onClick={() => setStep(3)} size="lg">Suivant</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>
                <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground mb-1">Titulaire</p><p className="font-medium">{form.getValues().firstName} {form.getValues().lastName}</p></div>
                    <div><p className="text-sm text-muted-foreground mb-1">Date de naissance</p><p className="font-medium">{new Date(form.getValues().dateOfBirth).toLocaleDateString("fr-FR")}</p></div>
                  </div>
                  <div className="h-px bg-slate-200 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground mb-1">Email</p><p className="font-medium">{form.getValues().email}</p></div>
                    <div><p className="text-sm text-muted-foreground mb-1">Téléphone</p><p className="font-medium">{form.getValues().phone}</p></div>
                  </div>
                  <div className="h-px bg-slate-200 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-muted-foreground mb-1">Type de compte</p><p className="font-medium capitalize">Compte {accountType}</p></div>
                    <div><p className="text-sm text-muted-foreground mb-1">Solde initial</p><p className="font-bold text-green-600 text-lg">3 200,00 €</p></div>
                  </div>
                  <div className="h-px bg-slate-200 w-full" />
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    <div><p className="text-sm text-muted-foreground">Pièce d&apos;identité</p><p className="font-medium text-green-700 text-sm">{idDocumentName} — Téléchargée ✓</p></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)} size="lg" disabled={isSubmitting}>Précédent</Button>
                  <Button onClick={handleFinalSubmit} size="lg" disabled={isSubmitting} className="min-w-[180px]">
                    {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Déjà un compte ? </span>
            <Link href="/login" className="text-primary font-medium hover:underline">Se connecter</Link>
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
