"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/language-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { UserCircle } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setDisplayName(user.displayName || "");
    }
  }, [user, router]);

  if (!user) return null;

  const handleUpdateProfile = async () => {
    if (!user) return;
    if (!displayName.trim()) {
      setError(t("account.profile.usernameRequired") || "El nombre de usuario es obligatorio.");
      return;
    }
    try {
      await updateProfile(user, { displayName });
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { displayName });
      setSuccess(t("account.profile.profileUpdated"));
      setError("");
      setIsEditing(false);
    } catch (err: any) {
      let msg = err.message || t("account.profile.error");
      if (err.code === "permission-denied") {
        msg = t("account.profile.permissionDenied") || "No tienes permisos para actualizar el perfil.";
      }
      setError(msg);
    }
  };

  const handleChangePassword = async () => {
    if (!user || !user.email) return;
    if (newPassword !== confirmPassword) {
      setError(t("account.profile.passwordsDontMatch"));
      return;
    }
    if (newPassword.length < 6) {
      setError(t("account.profile.passwordTooShort"));
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess(t("account.profile.passwordChanged"));
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(t("account.profile.incorrectPassword"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-blue-950">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md glass rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 border border-blue-900/40 relative animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 text-blue-400 font-orbitron drop-shadow-lg">
            {t("account.profile.title")}
          </h1>
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg bg-zinc-800 flex items-center justify-center relative">
              <UserCircle className="h-16 w-16 text-blue-400" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 mt-4 items-center text-center">
            <div className="w-full">
              <label className="block text-zinc-400 text-sm mb-1 font-semibold tracking-wide text-center">{t("account.profile.username")}</label>
              {isEditing ? (
                <div className="flex flex-col items-center gap-2">
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="flex-1 text-center"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateProfile} variant="default">
                      {t("account.profile.save")}
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="secondary">
                      {t("account.profile.cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg font-semibold text-white drop-shadow-sm text-center">{user?.displayName || user?.email}</span>
                  <Button onClick={() => setIsEditing(true)} variant="secondary">
                    {t("account.profile.edit")}
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full">
              <label className="block text-zinc-400 text-sm mb-1 font-semibold tracking-wide text-center">{t("account.profile.email")}</label>
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-semibold text-white drop-shadow-sm text-center">{user?.email}</span>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">{t("account.profile.changePassword")}</h3>
              {!showPasswordFields ? (
                <Button onClick={() => setShowPasswordFields(true)} variant="secondary">
                  {t("account.profile.changePassword")}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-1">{t("account.profile.password")}</label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder={t("account.profile.password")}
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-1">{t("account.profile.newPassword")}</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={t("account.profile.newPassword")}
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-1">{t("account.profile.confirmNewPassword")}</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t("account.profile.confirmNewPassword")}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleChangePassword} variant="default" className="w-full">
                      {t("account.profile.confirm")}
                    </Button>
                    <Button onClick={() => setShowPasswordFields(false)} variant="secondary" className="w-full">
                      {t("account.profile.cancel")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {error && <div className="text-red-400 mt-2">{error}</div>}
          {success && <div className="text-green-400 mt-2">{success}</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
} 