"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/language-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MainHeader from "@/components/main-header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

export default function ProfilePage() {
  const { user, avatarSeed, setAvatarSeed } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [name, setName] = useState(user?.displayName || user?.email || "");
  const [email, setEmail] = useState(user?.email || "");
  const [tempAvatarSeed, setTempAvatarSeed] = useState<string | null>(null);
  const [showSaveAvatar, setShowSaveAvatar] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [pendingField, setPendingField] = useState<"name" | "email" | null>(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Handler para editar nombre o email (requiere reautenticación)
  const handleEdit = (field: "name" | "email") => {
    setPendingField(field);
    setShowPasswordDialog(true);
    setError("");
    setSuccess("");
  };

  // Guardar cambios de nombre/email
  const handleSave = async () => {
    setError("");
    setSuccess("");
    if (!user) return;
    try {
      // Reautenticar
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);
      // Actualizar displayName
      if (pendingField === "name") {
        await updateProfile(user, { displayName: name });
        setSuccess(t("profile.profileUpdated"));
        setEditName(false);
      }
      // Actualizar email
      if (pendingField === "email") {
        await updateEmail(user, email);
        setSuccess(t("profile.profileUpdated"));
        setEditEmail(false);
      }
      setPassword("");
    } catch (e: any) {
      if (e.code === "auth/invalid-credential") {
        setError(t("profile.incorrectPassword"));
      } else if (e.code === "auth/email-already-in-use" || e.code === "auth/operation-not-allowed") {
        setError(t("profile.emailInUse"));
      } else {
        setError(e.message);
      }
    } finally {
      setShowPasswordDialog(false);
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    setPasswordError("");
    if (!user) return;
    if (newPassword.length < 6) {
      setPasswordError(t("profile.passwordTooShort"));
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError(t("profile.passwordsDontMatch"));
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowChangePasswordDialog(false);
      setSuccess(t("profile.passwordChanged"));
    } catch (e: any) {
      if (e.code === "auth/invalid-credential") {
        setPasswordError(t("profile.incorrectPassword"));
      } else {
        setPasswordError(e.message);
      }
    }
  };

  // Handler para elegir avatar aleatorio (solo cambia el temporal)
  const handleRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(2, 15);
    setTempAvatarSeed(randomSeed);
    setShowSaveAvatar(true);
  };

  // Handler para guardar el avatar elegido
  const handleSaveAvatar = async () => {
    if (setAvatarSeed && tempAvatarSeed) {
      await setAvatarSeed(tempAvatarSeed);
      setShowSaveAvatar(false);
      setTempAvatarSeed(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-blue-950">
      <MainHeader />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md glass rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 border border-blue-900/40 relative animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 text-blue-400 font-orbitron drop-shadow-lg">
            {t("profile.title")}
          </h1>
          <div className="relative flex flex-col items-center gap-2">
            {user && user.providerData.some(p => p.providerId === "google.com") ? (
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg bg-zinc-800 flex items-center justify-center relative">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="object-cover w-full h-full rounded-full" />
                ) : (
                  <span className="text-6xl text-blue-400">👤</span>
                )}
              </div>
            ) : (
              <>
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg bg-zinc-800 flex items-center justify-center relative">
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${tempAvatarSeed || avatarSeed || "default"}`}
                    alt="Avatar"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <Button onClick={handleRandomAvatar} variant="secondary" size="sm" className="mt-2">
                  {t("profile.randomAvatar") || "Elegir avatar al azar"}
                </Button>
                {showSaveAvatar && tempAvatarSeed && (
                  <Button onClick={handleSaveAvatar} variant="default" size="sm" className="mt-2">
                    {t("profile.saveAvatar") || "Guardar avatar"}
                  </Button>
                )}
              </>
            )}
          </div>
          <div className="w-full flex flex-col gap-6 mt-4">
            <div className="w-full">
              <label className="block text-zinc-400 text-sm mb-1 font-semibold tracking-wide">{t("profile.username")}</label>
              {editName ? (
                <div className="flex flex-col sm:flex-row gap-2 items-center animate-fade-in">
                  <Input value={name} onChange={e => setName(e.target.value)} className="flex-1" />
                  <Button onClick={() => handleEdit("name") } variant="default">
                    {t("profile.save")}
                  </Button>
                  <Button onClick={() => setEditName(false)} variant="secondary">
                    {t("profile.cancel")}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-white drop-shadow-sm">{name || email}</span>
                  <Button onClick={() => setEditName(true)} variant="secondary" size="sm">
                    {t("profile.edit")}
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full">
              <label className="block text-zinc-400 text-sm mb-1 font-semibold tracking-wide">{t("profile.email")}</label>
              {editEmail ? (
                <div className="flex flex-col sm:flex-row gap-2 items-center animate-fade-in">
                  <Input value={email} onChange={e => setEmail(e.target.value)} className="flex-1" />
                  <Button onClick={() => handleEdit("email") } variant="default">
                    {t("profile.save")}
                  </Button>
                  <Button onClick={() => setEditEmail(false)} variant="secondary">
                    {t("profile.cancel")}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-white drop-shadow-sm">{email}</span>
                  <Button onClick={() => setEditEmail(true)} variant="secondary" size="sm">
                    {t("profile.edit")}
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full">
              <Button 
                onClick={() => setShowChangePasswordDialog(true)}
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
              >
                {t("profile.changePassword")}
              </Button>
            </div>
          </div>
          {success && (
            <div className="flex items-center gap-2 text-green-400 text-sm mt-2 animate-fade-in">
              {success}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm mt-2 animate-fade-in">
              {error}
            </div>
          )}
        </div>
      </main>
      <Footer />
      {/* Diálogo para reautenticación */}
      {showPasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-zinc-950 rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in">
            <h2 className="text-blue-400 font-bold text-lg mb-4">{t("profile.confirmPassword")}</h2>
            <Input
              type="password"
              placeholder={t("profile.password")}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-4"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSave} variant="default">
                {t("profile.confirm")}
              </Button>
              <Button onClick={() => setShowPasswordDialog(false)} variant="secondary">
                {t("profile.cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Diálogo para cambiar contraseña */}
      {showChangePasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-zinc-950 rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in">
            <h2 className="text-blue-400 font-bold text-lg mb-4">{t("profile.changePassword")}</h2>
            <Input
              type="password"
              placeholder={t("profile.password")}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-2"
            />
            <Input
              type="password"
              placeholder={t("profile.newPassword")}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="mt-2"
            />
            <Input
              type="password"
              placeholder={t("profile.confirmNewPassword")}
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              className="mt-2"
            />
            {passwordError && (
              <div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in mt-2">
                {passwordError}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button onClick={handleChangePassword} variant="default">
                {t("profile.confirm")}
              </Button>
              <Button onClick={() => { setShowChangePasswordDialog(false); setPasswordError(""); }} variant="secondary">
                {t("profile.cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .glass {
          background: rgba(24, 28, 44, 0.85);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
      `}</style>
    </div>
  );
} 