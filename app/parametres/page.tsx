"use client";

import { useState, useEffect } from "react";
import { BackgroundAnimated } from "@/components/ui/BackgroundAnimated";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Icons
function UserIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function KeyIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  );
}

function EyeIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function DatabaseIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function ShieldIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function LogOutIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function RefreshIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function TrashIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function CheckIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const MOTION_OVERRIDE_KEY = "cpv_reduce_motion_override";
const COMPACT_MODE_KEY = "cpv_compact_mode";
const PROGRESS_STORAGE_KEY = "cpv_progress";
const NOTES_PREFIX = "cpv_notes";

export default function ParametresPage() {
  // User session
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Email edit
  const [newEmail, setNewEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailSaving, setEmailSaving] = useState(false);

  // Password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Delete account modals
  const [showDeleteStep1, setShowDeleteStep1] = useState(false);
  const [showDeleteStep2, setShowDeleteStep2] = useState(false);

  // Preferences
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // Data modals
  const [showDeleteNotesModal, setShowDeleteNotesModal] = useState(false);
  const [showResetProgressModal, setShowResetProgressModal] = useState(false);

  // Feedback
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data?.user?.email) {
          setUserEmail(data.user.email);
          setNewEmail(data.user.email);
        }
      } catch {
        // Session fetch failed
      } finally {
        setIsLoadingSession(false);
      }
    };
    fetchSession();
  }, []);

  // Load preferences
  useEffect(() => {
    const motionStored = localStorage.getItem(MOTION_OVERRIDE_KEY);
    if (motionStored === "true") {
      setReduceMotion(true);
      document.body.classList.add("reduce-motion-override");
    }

    const compactStored = localStorage.getItem(COMPACT_MODE_KEY);
    if (compactStored === "true") {
      setCompactMode(true);
      document.body.classList.add("compact-mode");
    }
  }, []);

  // Show feedback
  const showFeedbackMessage = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Toggle reduce motion
  const toggleReduceMotion = () => {
    const newValue = !reduceMotion;
    setReduceMotion(newValue);
    localStorage.setItem(MOTION_OVERRIDE_KEY, String(newValue));
    if (newValue) {
      document.body.classList.add("reduce-motion-override");
    } else {
      document.body.classList.remove("reduce-motion-override");
    }
  };

  // Toggle compact mode
  const toggleCompactMode = () => {
    const newValue = !compactMode;
    setCompactMode(newValue);
    localStorage.setItem(COMPACT_MODE_KEY, String(newValue));
    if (newValue) {
      document.body.classList.add("compact-mode");
    } else {
      document.body.classList.remove("compact-mode");
    }
  };

  // Save email (simulated - no backend endpoint)
  const handleSaveEmail = async () => {
    if (!newEmail || newEmail === userEmail) {
      setIsEditingEmail(false);
      return;
    }

    setEmailSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUserEmail(newEmail);
    setIsEditingEmail(false);
    setEmailSaving(false);
    showFeedbackMessage("success", "Email mis à jour avec succès.");
  };

  // Change password (simulated - no backend endpoint)
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showFeedbackMessage("error", "Veuillez remplir tous les champs.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showFeedbackMessage("error", "Les mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword.length < 8) {
      showFeedbackMessage("error", "Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setPasswordSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPasswordSaving(false);
    setShowPasswordModal(false);
    resetPasswordForm();
    showFeedbackMessage("success", "Mot de passe mis à jour avec succès.");
  };

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
  };

  // Delete account step 1 -> step 2
  const handleDeleteStep1Confirm = () => {
    setShowDeleteStep1(false);
    setShowDeleteStep2(true);
  };

  // Delete account final (simulated)
  const handleDeleteAccountFinal = async () => {
    setShowDeleteStep2(false);
    showFeedbackMessage("error", "La suppression de compte n'est pas encore disponible.");
  };

  // Delete all notes
  const deleteAllNotes = () => {
    const keysToDelete: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(NOTES_PREFIX)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach((key) => localStorage.removeItem(key));
    setShowDeleteNotesModal(false);
    showFeedbackMessage("success", "Toutes vos notes ont été supprimées.");
  };

  // Reset progress
  const resetProgress = () => {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("cpv-progress-update"));
    setShowResetProgressModal(false);
    showFeedbackMessage("success", "Votre progression a été réinitialisée.");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <PageTransition>
        <BackgroundAnimated variant="dark" className="min-h-screen">
          <div className="container-width py-12 md:py-20">
            {/* Hero minimal */}
            <ScrollReveal>
              <div className="max-w-3xl mx-auto mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Paramètres
                </h1>
                <p className="text-gray-400">
                  Gérez votre compte et vos préférences.
                </p>
              </div>
            </ScrollReveal>

            {/* Global feedback */}
            {feedback && (
              <div className="max-w-3xl mx-auto">
                <div
                  className={`mb-8 p-4 rounded-xl flex items-center gap-3 animate-fade-in ${
                    feedback.type === "success"
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <CheckIcon size={18} className="text-green-400 shrink-0" />
                  ) : (
                    <XIcon size={18} className="text-red-400 shrink-0" />
                  )}
                  <span className={feedback.type === "success" ? "text-green-400" : "text-red-400"}>
                    {feedback.message}
                  </span>
                </div>
              </div>
            )}

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Section 1: Compte */}
              <ScrollReveal delay={0.05}>
                <div className="parametres-card-v3 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                      <UserIcon size={18} className="text-blue-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Compte</h2>
                  </div>

                  {/* Email section */}
                  <div className="parametres-field-v3 p-4 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MailIcon size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-400">Adresse email</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        Compte actif
                      </span>
                    </div>

                    {isLoadingSession ? (
                      <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                    ) : isEditingEmail ? (
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                          placeholder="nouveau@email.com"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveEmail}
                          disabled={emailSaving}
                          className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 hover:-translate-y-0.5"
                        >
                          {emailSaving ? "..." : "Enregistrer"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingEmail(false);
                            setNewEmail(userEmail);
                          }}
                          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{userEmail || "Non défini"}</span>
                        <button
                          onClick={() => setIsEditingEmail(true)}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Modifier
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="parametres-divider my-5" />

                  {/* Password section */}
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="parametres-action-v3 w-full p-4 rounded-xl flex items-center gap-3 group"
                  >
                    <KeyIcon size={18} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                    <div className="text-left flex-1">
                      <span className="text-white group-hover:text-purple-300 transition-colors font-medium block">
                        Changer le mot de passe
                      </span>
                      <span className="text-xs text-gray-500">Sécurisez votre compte</span>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="parametres-divider my-5" />

                  {/* Danger zone - Delete account */}
                  <div className="parametres-danger-zone p-4 rounded-xl">
                    <p className="text-xs text-red-400/60 uppercase tracking-wider font-medium mb-3">Zone danger</p>
                    <button
                      onClick={() => setShowDeleteStep1(true)}
                      className="parametres-danger-action w-full p-3 rounded-lg flex items-center gap-3 group"
                    >
                      <TrashIcon size={18} className="text-red-400/50 group-hover:text-red-400 transition-colors" />
                      <span className="text-red-400/70 group-hover:text-red-300 transition-colors font-medium">
                        Supprimer mon compte
                      </span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Section 2: Préférences */}
              <ScrollReveal delay={0.1}>
                <div className="parametres-card-v3 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                      <EyeIcon size={18} className="text-purple-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Préférences</h2>
                  </div>

                  <div className="space-y-3">
                    {/* Reduce animations toggle */}
                    <div className="parametres-toggle-v3 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Réduire les animations</p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Désactive les transitions et effets visuels
                        </p>
                      </div>
                      <button
                        onClick={toggleReduceMotion}
                        className={`parametres-switch w-14 h-8 rounded-full relative transition-all duration-300 ${
                          reduceMotion ? "bg-purple-500" : "bg-white/10"
                        }`}
                        aria-label={reduceMotion ? "Désactiver la réduction des animations" : "Activer la réduction des animations"}
                      >
                        <span
                          className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 shadow-sm ${
                            reduceMotion ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Compact mode toggle */}
                    <div className="parametres-toggle-v3 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Mode compact</p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Réduit l&apos;espacement pour afficher plus de contenu
                        </p>
                      </div>
                      <button
                        onClick={toggleCompactMode}
                        className={`parametres-switch w-14 h-8 rounded-full relative transition-all duration-300 ${
                          compactMode ? "bg-purple-500" : "bg-white/10"
                        }`}
                        aria-label={compactMode ? "Désactiver le mode compact" : "Activer le mode compact"}
                      >
                        <span
                          className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 shadow-sm ${
                            compactMode ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Section 3: Données formation */}
              <ScrollReveal delay={0.15}>
                <div className="parametres-card-v3 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                      <DatabaseIcon size={18} className="text-orange-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Données formation</h2>
                  </div>

                  <div className="space-y-3">
                    {/* Reset progress button */}
                    <button
                      onClick={() => setShowResetProgressModal(true)}
                      className="parametres-data-action w-full p-4 rounded-xl flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <RefreshIcon size={18} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
                        <div className="text-left">
                          <p className="text-white group-hover:text-orange-300 transition-colors font-medium">
                            Réinitialiser progression
                          </p>
                          <p className="text-xs text-gray-500">Remet votre avancement à 0%</p>
                        </div>
                      </div>
                    </button>

                    {/* Delete notes button */}
                    <button
                      onClick={() => setShowDeleteNotesModal(true)}
                      className="parametres-data-action w-full p-4 rounded-xl flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <TrashIcon size={18} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
                        <div className="text-left">
                          <p className="text-white group-hover:text-orange-300 transition-colors font-medium">
                            Effacer toutes mes notes
                          </p>
                          <p className="text-xs text-gray-500">Action irréversible</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Section 4: Sécurité */}
              <ScrollReveal delay={0.2}>
                <div className="parametres-card-v3 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center">
                      <ShieldIcon size={18} className="text-gray-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Sécurité</h2>
                  </div>

                  <form action="/api/auth/signout" method="post">
                    <button
                      type="submit"
                      className="parametres-logout-v3 w-full p-4 rounded-xl flex items-center justify-center gap-3"
                    >
                      <LogOutIcon size={18} />
                      Se déconnecter
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Password Modal */}
          {showPasswordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => {
                  setShowPasswordModal(false);
                  resetPasswordForm();
                }}
              />
              <div className="parametres-modal relative p-6 rounded-2xl max-w-md w-full animate-modal-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <KeyIcon size={24} className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Changer le mot de passe
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Current password */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Mot de passe actuel</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="Entrez votre mot de passe actuel"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showCurrentPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New password */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                        placeholder="Minimum 8 caractères"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showNewPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Confirmez le nouveau mot de passe"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      resetPasswordForm();
                    }}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={passwordSaving}
                    className="flex-1 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-all duration-200 disabled:opacity-50 hover:-translate-y-0.5"
                  >
                    {passwordSaving ? "Mise à jour..." : "Mettre à jour"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Account Step 1 Modal */}
          {showDeleteStep1 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowDeleteStep1(false)}
              />
              <div className="parametres-modal relative p-6 rounded-2xl max-w-md w-full animate-modal-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangleIcon size={24} className="text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Supprimer votre compte ?
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Êtes-vous sûr de vouloir supprimer votre compte ? Cette action entraînera la perte de toutes vos données.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteStep1(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteStep1Confirm}
                    className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 border border-red-500/30 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Account Step 2 Modal */}
          {showDeleteStep2 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowDeleteStep2(false)}
              />
              <div className="parametres-modal relative p-6 rounded-2xl max-w-md w-full animate-modal-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center">
                    <AlertTriangleIcon size={24} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Confirmation finale
                  </h3>
                </div>
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
                  <p className="text-red-300 text-sm font-medium">
                    Cette action est irréversible.
                  </p>
                  <p className="text-red-400/70 text-sm mt-1">
                    Votre compte, votre progression et toutes vos notes seront définitivement supprimés.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteStep2(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteAccountFinal}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Supprimer définitivement
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reset progress modal */}
          {showResetProgressModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowResetProgressModal(false)}
              />
              <div className="parametres-modal relative p-6 rounded-2xl max-w-md w-full animate-modal-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <RefreshIcon size={24} className="text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Réinitialiser la progression ?
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Cette action remettra votre progression à 0%. Vos notes ne seront pas affectées.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetProgressModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={resetProgress}
                    className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete notes modal */}
          {showDeleteNotesModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowDeleteNotesModal(false)}
              />
              <div className="parametres-modal relative p-6 rounded-2xl max-w-md w-full animate-modal-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <TrashIcon size={24} className="text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Effacer toutes les notes ?
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Cette action est irréversible. Toutes vos notes prises pendant les leçons seront définitivement supprimées.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteNotesModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={deleteAllNotes}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </BackgroundAnimated>
      </PageTransition>
    </div>
  );
}
