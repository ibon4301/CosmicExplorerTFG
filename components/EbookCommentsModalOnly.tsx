import { useEffect, useState } from "react";
import { getEbookComments, EbookComment } from "@/lib/firebase/comments";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";

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
  const [userAvatars, setUserAvatars] = useState<{ [email: string]: string | null }>({});

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [ebookTitle]);

  useEffect(() => {
    comments.forEach(c => {
      if (!c.photoURL && c.email) fetchAvatarSeed(c.email);
    });
    // eslint-disable-next-line
  }, [comments]);

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

  async function fetchAvatarSeed(email: string) {
    if (userAvatars[email] !== undefined) return; // Ya está en caché
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      setUserAvatars(prev => ({ ...prev, [email]: data.avatarSeed || null }));
    } else {
      setUserAvatars(prev => ({ ...prev, [email]: null }));
    }
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
              <div className="flex items-center mb-1 gap-2">
                <Avatar className="h-8 w-8 border border-zinc-700 bg-zinc-800">
                  {c.photoURL ? (
                    <AvatarImage src={c.photoURL} alt={c.username} />
                  ) : c.avatarSeed ? (
                    <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${c.avatarSeed}`} alt={c.username} />
                  ) : (
                    <AvatarFallback>
                      <UserCircle className="w-5 h-5 text-zinc-400" />
                    </AvatarFallback>
                  )}
                </Avatar>
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