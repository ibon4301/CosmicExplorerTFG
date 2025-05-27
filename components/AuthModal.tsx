import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/language-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({ open, onClose, initialMode = "login" }: AuthModalProps) {
  const { login, register, loginWithGoogle, user } = useAuth();
  const { language } = useLanguage();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, open]);

  // Limpiar campos si el usuario cierra sesión
  useEffect(() => {
    if (user === null) {
      setEmail("");
      setPassword("");
      setDisplayName("");
      setError("");
    }
  }, [user]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        onClose();
      } else {
        if (!displayName.trim()) {
          setError(language === "es" ? "El nombre de usuario es obligatorio." : "Username is required.");
          setLoading(false);
          return;
        }
        await register(email, password);
        // Actualizar el displayName tras registro
        if (typeof window !== "undefined") {
          const user = (await import("firebase/auth")).getAuth().currentUser;
          if (user) {
            await (await import("firebase/auth")).updateProfile(user, { displayName });
            // Guardar usuario en Firestore
            await setDoc(doc(db, "users", user.uid), {
              displayName,
              email,
              photoURL: user.photoURL || null,
            }, { merge: true });
          }
        }
        onClose();
      }
    } catch (err: any) {
      let msg = err.message || (language === "es" ? "Error de autenticación" : "Authentication error");
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = language === "es"
          ? "No existe un usuario con ese correo o la contraseña es incorrecta."
          : "No account exists with that email or the password is incorrect.";
      }
      if (err.code === "auth/email-already-in-use") {
        msg = language === "es"
          ? "Ya existe una cuenta con ese correo electrónico."
          : "An account with that email already exists.";
      }
      setError(msg);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoadingGoogle(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(language === "es" ? "Error al iniciar sesión con Google" : "Error signing in with Google");
    }
    setLoadingGoogle(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black bg-opacity-70 overflow-y-auto">
      <div className="bg-zinc-950 rounded-lg shadow-lg p-6 w-full max-w-sm relative font-helvetica modal-appear">
        <button
          className="absolute top-2 right-2 text-zinc-400 hover:text-white text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">
          {mode === "login"
            ? (language === "es" ? "Iniciar sesión" : "Sign in")
            : (language === "es" ? "Registrarse" : "Register")}
        </h3>
        <button
          type="button"
          className="bg-white text-zinc-900 hover:bg-zinc-200 px-4 py-2 rounded flex items-center justify-center gap-2 w-full mb-4 font-semibold"
          onClick={handleGoogle}
          disabled={loadingGoogle}
        >
          <span className="inline-flex items-center justify-center w-5 h-5 mr-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.48a4.7 4.7 0 01-2.04 3.08v2.56h3.3c1.93-1.78 3.06-4.4 3.06-7.43z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.96-.9 6.61-2.44l-3.3-2.56c-.92.62-2.1.99-3.31.99-2.54 0-4.7-1.72-5.47-4.04H1.13v2.6A10 10 0 0010 20z" fill="#34A853"/>
                <path d="M4.53 11.95A5.99 5.99 0 014.13 10c0-.68.12-1.35.33-1.95V5.45H1.13A10 10 0 000 10c0 1.64.39 3.19 1.13 4.55l3.4-2.6z" fill="#FBBC05"/>
                <path d="M10 4.01c1.47 0 2.78.51 3.81 1.5l2.85-2.85C14.96 1.13 12.7 0 10 0A10 10 0 001.13 5.45l3.4 2.6C5.3 6.73 7.46 4.01 10 4.01z" fill="#EA4335"/>
              </g>
            </svg>
          </span>
          {loadingGoogle
            ? (language === "es" ? "Cargando..." : "Loading...")
            : (language === "es" ? "Iniciar sesión con Google" : "Sign in with Google")}
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder={language === "es" ? "Nombre de usuario" : "Username"}
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
              autoFocus
              required
            />
          )}
          <input
            type="email"
            placeholder={language === "es" ? "Correo electrónico" : "Email"}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder={language === "es" ? "Contraseña" : "Password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold"
            disabled={loading}
          >
            {loading
              ? (language === "es" ? "Cargando..." : "Loading...")
              : mode === "login"
                ? (language === "es" ? "Iniciar sesión" : "Sign in")
                : (language === "es" ? "Registrarse" : "Register")}
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <button
            className="text-blue-400 hover:underline text-sm"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
          >
            {mode === "login"
              ? (language === "es" ? "¿No tienes cuenta? Regístrate" : "Don't have an account? Register")
              : (language === "es" ? "¿Ya tienes cuenta? Inicia sesión" : "Already have an account? Sign in")}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
} 