import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, LogIn, UserPlus, LogOut, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

const errorMessages = {
  "auth/user-not-found": {
    es: "No existe una cuenta con este correo electrónico.",
    en: "No account exists with this email."
  },
  "auth/wrong-password": {
    es: "La contraseña es incorrecta. Por favor, inténtalo de nuevo.",
    en: "Incorrect password. Please try again."
  },
  "auth/email-already-in-use": {
    es: "Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.",
    en: "This email is already registered. Please sign in or use a different email."
  },
  "auth/invalid-email": {
    es: "El formato del correo electrónico no es válido.",
    en: "The email format is not valid."
  },
  "auth/weak-password": {
    es: "La contraseña debe tener al menos 6 caracteres.",
    en: "Password must be at least 6 characters long."
  },
  "auth/too-many-requests": {
    es: "Demasiados intentos fallidos. Por favor, espera unos minutos antes de intentarlo de nuevo.",
    en: "Too many failed attempts. Please wait a few minutes before trying again."
  },
  "auth/popup-closed-by-user": {
    es: "La ventana de inicio de sesión con Google fue cerrada.",
    en: "The Google sign-in popup was closed."
  },
  "auth/popup-blocked": {
    es: "La ventana de inicio de sesión fue bloqueada por el navegador. Por favor, permite las ventanas emergentes.",
    en: "The sign-in popup was blocked by the browser. Please allow popups."
  },
  "auth/network-request-failed": {
    es: "Error de conexión. Por favor, verifica tu conexión a internet.",
    en: "Network error. Please check your internet connection."
  },
  "auth/operation-not-allowed": {
    es: "El inicio de sesión con correo electrónico y contraseña no está habilitado.",
    en: "Email and password sign-in is not enabled."
  },
  "auth/requires-recent-login": {
    es: "Por seguridad, necesitas iniciar sesión de nuevo para realizar esta acción.",
    en: "For security reasons, you need to sign in again to perform this action."
  },
  "auth/invalid-credential": {
    es: "No existe una cuenta con este correo electrónico o la contraseña es incorrecta.",
    en: "No account exists with this email or the password is incorrect."
  },
  "default": {
    es: "Ha ocurrido un error durante la autenticación. Por favor, inténtalo de nuevo.",
    en: "An authentication error occurred. Please try again."
  }
};

export default function AuthModal({ open, onClose, initialMode = "login" }: AuthModalProps) {
  const { login, register, loginWithGoogle, user, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { language } = useLanguage();
  const [loadingLocal, setLoadingLocal] = useState(false);

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode, open]);

  if (!open) return null;

  const getErrorMessage = (code: string) => {
    const msg = errorMessages[code as keyof typeof errorMessages];
    return msg ? msg[language as "es" | "en"] : errorMessages["default"][language as "es" | "en"];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoadingLocal(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err: any) {
      console.log('Auth error:', err);
      const code = typeof err.code === "string" ? err.code : "default";
      setError(getErrorMessage(code));
    }
    setLoadingLocal(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoadingLocal(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    }
    setLoadingLocal(false);
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
          {isLogin ? (language === "es" ? "Iniciar sesión" : "Sign in") : (language === "es" ? "Crear cuenta" : "Register")}
        </h3>
        {user ? (
          <div className="flex flex-col items-center">
            <span className="text-green-400 mb-2">{language === "es" ? "Ya has iniciado sesión" : "You are already logged in"}</span>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={logout}
            >
              <LogOut className="w-4 h-4" /> {language === "es" ? "Cerrar sesión" : "Log out"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-zinc-300">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-2 py-1 rounded bg-zinc-800 text-white"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-zinc-300">{language === "es" ? "Contraseña" : "Password"}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="px-2 py-1 rounded bg-zinc-800 text-white"
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
              disabled={loadingLocal}
            >
              {loadingLocal ? <Loader2 className="animate-spin w-4 h-4" /> : isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {isLogin ? (language === "es" ? "Iniciar sesión" : "Sign in") : (language === "es" ? "Crear cuenta" : "Register")}
            </button>
            <button
              type="button"
              className="bg-white text-zinc-900 hover:bg-zinc-200 px-4 py-2 rounded flex items-center justify-center gap-2"
              onClick={handleGoogle}
              disabled={loadingLocal}
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
              {language === "es" ? "Iniciar sesión con Google" : "Sign in with Google"}
            </button>
            <button
              type="button"
              className="text-blue-400 hover:underline text-sm mt-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? (language === "es" ? "¿No tienes cuenta? Regístrate" : "Don't have an account? Register")
                : (language === "es" ? "¿Ya tienes cuenta? Inicia sesión" : "Already have an account? Sign in")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 