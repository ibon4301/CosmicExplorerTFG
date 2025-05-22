import { useEffect, useState } from "react";
import { getEbookComments, EbookComment } from "@/lib/firebase/comments";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface Props {
  ebookTitle: string;
  ebookImage: string;
  ebookDescription: string;
  onClose: () => void;
}

export default function EbookCommentsModalOnly({ ebookTitle, ebookImage, ebookDescription, onClose }: Props) {
  const [comments, setComments] = useState<EbookComment[]>([]);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);

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
      // Puedes mostrar un error si quieres
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black bg-opacity-70 overflow-y-auto">
      <div className="relative w-full max-w-md p-6 bg-zinc-950 rounded-2xl shadow-2xl modal-appear">
        <button
          className="absolute top-2 right-2 text-zinc-400 hover:text-white text-xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X />
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
        <div className="mt-6">
          <h5 className="text-blue-200 font-semibold mb-2 text-center">{language === "es" ? "Reseñas de otros usuarios" : "Other users' reviews"}</h5>
          {loading && <p className="text-zinc-400 text-center">{language === "es" ? "Cargando..." : "Loading..."}</p>}
          {!loading && comments.length === 0 && <p className="text-zinc-400 text-center">{language === "es" ? "Aún no hay comentarios." : "No comments yet."}</p>}
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
  );
} 