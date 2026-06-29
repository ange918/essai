import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { getSession, getUserById, clearSession, updateUser, User } from "@/lib/storage";
import { Lock, Clock, UploadCloud, LogOut, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sessionId = getSession();
    if (!sessionId) {
      setLocation("/login");
      return;
    }
    const userData = getUserById(sessionId);
    if (!userData) {
      clearSession();
      setLocation("/login");
      return;
    }
    setUser(userData);
  }, [setLocation]);

  const handleLogout = () => {
    clearSession();
    setLocation("/login");
  };

  const handleReupload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const doc = ev.target?.result as string;
      updateUser(user.id, { kycStatus: 'pending', idDocument: doc });
      setUser({ ...user, kycStatus: 'pending', idDocument: doc });
      setShowSuccessMsg(true);
      setTimeout(() => setShowSuccessMsg(false), 6000);
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-border h-16 flex items-center px-4 md:px-8 justify-between shrink-0">
        <div className="font-bold text-xl text-primary">NELLOA BANK</div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground hidden md:inline-block">
            {user.firstName} {user.lastName}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">

        {user.status === 'blocked' ? (
          <div className="bg-white border border-border rounded-2xl p-8 shadow-sm text-center max-w-2xl mx-auto mt-8">

            {user.kycStatus === 'pending' && (
              <>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Votre dossier est en cours de vérification</h2>
                <p className="text-muted-foreground text-base mb-6">
                  Nous avons bien reçu votre pièce d'identité. Notre équipe la vérifie et activera votre compte sous{" "}
                  <span className="font-semibold text-foreground">24 à 48h</span>.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-amber-800 text-sm">Document reçu</p>
                    <p className="text-sm text-amber-700 mt-0.5">
                      Vous serez notifié dès que votre compte sera activé.
                    </p>
                  </div>
                </div>
              </>
            )}

            {user.kycStatus === 'rejected' && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Votre document a été refusé</h2>
                <p className="text-muted-foreground text-base mb-6">
                  Le document soumis n'a pas pu être validé. Veuillez soumettre un document valide
                  (carte nationale d'identité, passeport ou titre de séjour).
                </p>

                {showSuccessMsg ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-start text-left gap-3 animate-in fade-in">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Nouveau document envoyé</p>
                      <p className="text-sm mt-0.5">Notre équipe le vérifie sous 24h.</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-primary/30 rounded-xl p-10 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      accept="image/*,.pdf"
                      onChange={handleReupload}
                    />
                    <UploadCloud className="h-10 w-10 text-primary/50 mx-auto mb-4 group-hover:text-primary transition-colors" />
                    <p className="font-medium text-foreground mb-2">
                      Cliquez pour soumettre un nouveau document
                    </p>
                    <p className="text-sm text-muted-foreground">Formats acceptés : JPG, PNG, PDF — 5 Mo max</p>
                  </div>
                )}
              </>
            )}

            {user.kycStatus !== 'pending' && user.kycStatus !== 'rejected' && (
              <>
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Compte en attente d'activation</h2>
                <p className="text-muted-foreground">Notre équipe traite votre dossier. Revenez bientôt.</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Bienvenue, {user.firstName} 👋</h1>
                <p className="text-muted-foreground">Gérez vos finances en toute simplicité.</p>
              </div>
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm">
                Compte actif ✅
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg lg:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                </div>
                <div className="relative z-10">
                  <p className="text-primary-foreground/80 font-medium mb-1 capitalize">Compte {user.accountType}</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: user.currency }).format(user.balance)}
                  </h2>
                  <div className="flex gap-4">
                    <Button className="bg-white text-primary hover:bg-white/90">Faire un virement</Button>
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">Relevé d'identité</Button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-foreground">Informations</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Ouverture le</p>
                      <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Statut KYC</p>
                      <p className="font-medium text-green-600">Vérifié ✅</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Type de compte</p>
                      <p className="font-medium capitalize">{user.accountType}</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-6 justify-start text-primary p-0 hover:bg-transparent hover:underline">Voir les paramètres</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
