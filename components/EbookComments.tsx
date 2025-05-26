import { useEffect, useState } from "react";
import { addEbookComment, getEbookComments, EbookComment } from "@/lib/firebase/comments";
import { Pencil, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { useLanguage } from "@/contexts/language-context";

interface EbookCommentsProps {
  ebookTitle: string;
  ebookImage: string;
  ebookDescription: string;
  onShowComments?: () => void;
}

// Utilidad para mostrar estrellas según la media, con media estrella SVG
function StarRating({ value, max = 5 }: { value: number, max?: number }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (value >= i) {
      // Estrella rellena
      stars.push(<span key={i} className="text-yellow-400 text-xl align-middle leading-none">★</span>);
    } else if (value > i - 1 && value < i) {
      // Media estrella SVG
      stars.push(
        <span key={i} className="text-yellow-400 text-xl inline-block align-middle leading-none" style={{ width: '1em', height: '1em' }}>
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`half-gradient-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={`url(#half-gradient-${i})`} stroke="#facc15" strokeWidth="1" />
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="#facc15" strokeWidth="1" />
          </svg>
        </span>
      );
    } else {
      // Estrella vacía
      stars.push(<span key={i} className="text-zinc-600 text-xl align-middle leading-none">☆</span>);
    }
  }
  return <span>{stars}</span>;
}

export default function EbookComments({ ebookTitle, ebookImage, ebookDescription, onShowComments }: EbookCommentsProps) {
  const [comments, setComments] = useState<EbookComment[]>([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | false>(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const { language } = useLanguage();

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [ebookTitle]);

  async function fetchComments() {
    setLoading(true);
    try {
      const data = await getEbookComments(ebookTitle);
      setComments(data);
    } catch (e) {
      console.error("Error al cargar comentarios:", e);
      setError("Error al cargar comentarios");
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim() || !title.trim() || rating < 0 || rating > 5) return;
    setLoading(true);
    try {
      await addEbookComment({
        ebookTitle,
        username: user?.displayName || user?.email || "Anónimo",
        comment: comment.trim(),
        rating,
        title: title.trim(),
      } as any); // 'as any' para permitir el nuevo campo 'title'
      setComment("");
      setTitle("");
      setRating(0);
      fetchComments();
      setShowModal(false);
    } catch (e) {
      setError("Error al enviar comentario");
    }
    setLoading(false);
  }

  // Calcular media de estrellas
  const avgRatingNum =
    comments.length > 0
      ? comments.reduce((acc, c) => acc + c.rating, 0) / comments.length
      : 0;
  const avgRating = comments.length > 0 ? avgRatingNum.toFixed(1) : "-";

  // Traducción para valoraciones
  const reviewText = language === "es"
    ? `${comments.length} valoraciones`
    : `${comments.length} review${comments.length === 1 ? "" : "s"}`;

  return (
    <div className="mt-4">
      <div className="flex items-center mb-2 gap-2 relative min-h-[32px]">
        <span className="inline-flex w-[110px] justify-start items-center leading-none">
          <StarRating value={avgRatingNum} />
        </span>
        <span className="text-lg font-semibold w-8 text-center">{avgRating}</span>
        <span className="text-zinc-400 text-sm w-32 text-left whitespace-nowrap">
          {reviewText}
        </span>
        <div className="flex items-center ml-auto gap-1">
          <button
            className="p-1 rounded hover:bg-zinc-800 transition-colors relative"
            onClick={() => {
              if (!user) setShowAuthModal(true);
              else setShowModal(true);
            }}
            onMouseEnter={() => setShowTooltip("review")}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Pencil className="w-5 h-5 text-blue-400 hover:text-blue-600" />
            {showTooltip === "review" && (
              <span className="absolute right-0 top-8 bg-zinc-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap animate-fade-in">
                {language === "es" ? "¡Escribe una reseña!" : "Write a review!"}
              </span>
            )}
          </button>
          <button
            className="p-1 rounded hover:bg-zinc-800 transition-colors relative"
            onClick={onShowComments}
            onMouseEnter={() => setShowTooltip("comments")}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <MessageCircle className="w-5 h-5 text-blue-400 hover:text-blue-600" />
            {showTooltip === "comments" && (
              <span className="absolute right-0 top-8 bg-zinc-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap animate-fade-in">
                {language === "es" ? "Comentarios" : "Comments"}
              </span>
            )}
          </button>
        </div>
        <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode="login" />
      </div>
      {/* Modal SOLO comentarios para no autenticados */}
      {showModal && !user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black bg-opacity-70 overflow-y-auto">
          <div className="bg-zinc-950 rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-white text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="flex flex-col items-center mb-4">
              <img
                src={ebookImage || "/images/ebooks/default-cover.jpg"}
                alt={ebookTitle}
                className="w-24 h-32 object-cover rounded mb-2 border border-zinc-800"
              />
              <h4 className="font-bold text-lg text-blue-300 mb-1 text-center">{ebookTitle}</h4>
              <p className="text-zinc-400 text-sm text-center mb-2">{ebookDescription}</p>
            </div>
            <div className="mt-2 mb-4 flex justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setShowAuthModal(true)}
              >
                {language === "es" ? "Iniciar sesión para comentar" : "Sign in to comment"}
              </button>
            </div>
            {/* Lista de comentarios */}
            <div className="mt-6">
              <h5 className="text-blue-200 font-semibold mb-2 text-center">{language === "es" ? "Reseñas de otros usuarios" : "Other users' reviews"}</h5>
              {comments.length === 0 && <p className="text-zinc-400 text-center">{language === "es" ? "Aún no hay comentarios." : "No comments yet."}</p>}
              {comments.map((c, i) => (
                <div key={i} className="mb-4 border-b border-zinc-800 pb-2">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-blue-200 mr-2">{c.username}</span>
                    <span className="text-yellow-400 text-lg">{"★".repeat(c.rating)}</span>
                    <span className="text-zinc-500 ml-2 text-xs">
                      {c.createdAt.toDate().toLocaleString()}
                    </span>
                  </div>
                  <div className="font-bold text-white mb-1">{(c as any).title}</div>
                  <div className="text-zinc-200">{c.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Modal completo para autenticados */}
      {showModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black bg-opacity-70 overflow-y-auto">
          <div className="bg-zinc-950 rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-white text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="flex flex-col items-center mb-4">
              <img
                src={ebookImage || "/images/ebooks/default-cover.jpg"}
                alt={ebookTitle}
                className="w-24 h-32 object-cover rounded mb-2 border border-zinc-800"
              />
              <h4 className="font-bold text-lg text-blue-300 mb-1 text-center">{ebookTitle}</h4>
              <p className="text-zinc-400 text-sm text-center mb-2">{ebookDescription}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={language === "es" ? "Título de la reseña" : "Review title"}
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="mb-2 px-2 py-1 rounded bg-zinc-800 text-white w-full"
                required
              />
              <textarea
                placeholder={language === "es" ? "Escribe tu comentario..." : "Write your comment..."}
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="mb-2 px-2 py-1 rounded bg-zinc-800 text-white w-full"
                required
              />
              <div className="flex items-center mb-2">
                <span className="mr-2 text-zinc-300">{language === "es" ? "Valoración:" : "Rating:"}</span>
                {[0, 1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-zinc-600"}`}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-2 text-zinc-400">{rating} / 5</span>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
                disabled={loading}
              >
                {loading ? (language === "es" ? "Enviando..." : "Sending...") : (language === "es" ? "Enviar comentario" : "Send comment")}
              </button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
            {/* Lista de comentarios dentro del modal */}
            <div className="mt-6">
              <h5 className="text-blue-200 font-semibold mb-2 text-center">{language === "es" ? "Reseñas de otros usuarios" : "Other users' reviews"}</h5>
              {comments.length === 0 && <p className="text-zinc-400 text-center">{language === "es" ? "Aún no hay comentarios." : "No comments yet."}</p>}
              {comments.map((c, i) => (
                <div key={i} className="mb-4 border-b border-zinc-800 pb-2">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-blue-200 mr-2">{c.username}</span>
                    <span className="text-yellow-400 text-lg">{"★".repeat(c.rating)}</span>
                    <span className="text-zinc-500 ml-2 text-xs">
                      {c.createdAt.toDate().toLocaleString()}
                    </span>
                  </div>
                  <div className="font-bold text-white mb-1">{(c as any).title}</div>
                  <div className="text-zinc-200">{c.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 