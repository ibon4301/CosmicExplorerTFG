"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserComments, deleteEbookComment, editEbookComment, EbookComment } from "@/lib/firebase/comments";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/contexts/language-context";
import { Star, UserCircle } from "lucide-react";

type Review = EbookComment & { id: string };

function StarRating({ value, max = 5 }: { value: number, max?: number }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (value >= i) {
      stars.push(<span key={i} className="text-yellow-400 text-xl align-middle leading-none">★</span>);
    } else if (value > i - 1 && value < i) {
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
      stars.push(<span key={i} className="text-zinc-600 text-xl align-middle leading-none">☆</span>);
    }
  }
  return <span>{stars}</span>;
}

function StarRatingEdit({ value, onChange, max = 5 }: { value: number, onChange: (v: number) => void, max?: number }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    stars.push(
      <button
        key={i}
        type="button"
        onClick={() => onChange(i)}
        className={`text-2xl ${i <= value ? "text-yellow-400" : "text-zinc-600"}`}
        aria-label={`Valoración ${i}`}
      >
        ★
      </button>
    );
  }
  return <span>{stars}</span>;
}

export default function MyReviewsPage() {
  const { user, avatarSeed } = useAuth();
  const { t, language } = useLanguage();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: "", comment: "", rating: 0 });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const avatarAlt = (user?.displayName || user?.email || 'avatar') as string;

  useEffect(() => {
    if (user === null) {
      router.push("/");
    } else if (user !== undefined) {
      setAuthChecked(true);
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    console.log('DEBUG email usuario:', user.email);
    if (typeof user.email !== 'string' || !user.email) {
      setError('No se ha encontrado el email del usuario.');
      setLoading(false);
      return;
    }
    getUserComments(user.email)
      .then(res => {
        console.log('DEBUG reseñas obtenidas:', res);
        setReviews(res)
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [user]);

  const grouped = reviews.reduce((acc, review) => {
    if (!acc[review.ebookTitle]) acc[review.ebookTitle] = [];
    acc[review.ebookTitle].push(review);
    return acc;
  }, {} as Record<string, Review[]>);

  const handleDelete = async (id: string) => {
    await deleteEbookComment(id);
    setReviews(reviews => reviews.filter(r => r.id !== id));
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setEditData({ title: review.title || "", comment: review.comment || "", rating: review.rating });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await editEbookComment(editingId, editData);
      setReviews(reviews => reviews.map(r => r.id === editingId ? { ...r, ...editData } : r));
      setEditingId(null);
      setSuccess(t("myReviews.success"));
      setError("");
    } catch (err) {
      console.error('Error al editar reseña:', err);
      setError((err as Error)?.message || (language === 'es' ? 'No se pudo guardar la reseña.' : 'Could not save the review.'));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <span className="text-zinc-400">{t("loader.loadingWait")}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-blue-950">
      <Header />
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-3xl glass rounded-2xl shadow-2xl p-8 flex flex-col gap-8 border border-blue-900/40 animate-fade-in">
          <h1 className="text-3xl font-bold text-blue-400 font-orbitron mb-4">{t("account.myReviews")}</h1>
          {loading ? (
            <div className="text-zinc-400">{t("loader.loadingWait")}</div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="text-zinc-400">{language === 'es' ? 'No tienes reseñas todavía.' : 'You have no reviews yet.'}</div>
          ) : (
            Object.entries(grouped).map(([ebook, reviews]) => (
              <section key={ebook} className="mb-8">
                <h2 className="text-xl font-bold text-blue-300 mb-2">{ebook}</h2>
                <div className="flex flex-col gap-4">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-zinc-900/70 rounded-lg p-4 border border-blue-900/30">
                      {editingId === review.id ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-blue-200 font-semibold" htmlFor="edit-title">{language === 'es' ? 'Editar reseña' : 'Edit review'}</label>
                          <Input
                            id="edit-title"
                            value={editData.title}
                            onChange={e => setEditData({ ...editData, title: e.target.value })}
                            placeholder={language === 'es' ? 'Título' : 'Title'}
                          />
                          <label className="text-sm text-blue-200 font-semibold" htmlFor="edit-comment">{language === 'es' ? 'Comentario' : 'Comment'}</label>
                          <Input
                            id="edit-comment"
                            value={editData.comment}
                            onChange={e => setEditData({ ...editData, comment: e.target.value })}
                            placeholder={language === 'es' ? 'Comentario' : 'Comment'}
                          />
                          <label className="text-sm font-medium text-zinc-300" htmlFor="edit-rating">{language === 'es' ? 'Valoración' : 'Rating'}</label>
                          <div className="flex items-center gap-2">
                            <StarRatingEdit value={editData.rating} onChange={r => setEditData({ ...editData, rating: r })} />
                            <span className="ml-2 text-zinc-400">{editData.rating} / 5</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button onClick={handleSaveEdit} variant="default">{language === 'es' ? 'Guardar' : 'Save'}</Button>
                            <Button onClick={handleCancelEdit} variant="secondary">{language === 'es' ? 'Cancelar' : 'Cancel'}</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            {/* Avatar actual del usuario autenticado */}
                            {user?.photoURL ? (
                              <img src={user.photoURL ? user.photoURL : ""} alt={avatarAlt} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                            ) : avatarSeed ? (
                              <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`} alt={avatarAlt} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                            ) : (
                              <UserCircle className="w-8 h-8 text-zinc-500" />
                            )}
                            <span className="font-semibold text-white">{review.title}</span>
                            <StarRating value={review.rating} />
                          </div>
                          <span className="text-zinc-300">{review.comment}</span>
                          <div className="flex gap-2 mt-2">
                            <Button onClick={() => handleEdit(review)} variant="secondary" size="sm">{language === 'es' ? 'Editar' : 'Edit'}</Button>
                            <Button onClick={() => handleDelete(review.id)} variant="destructive" size="sm">{language === 'es' ? 'Eliminar' : 'Delete'}</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
          {success && <div className="text-green-400 mt-2">{language === 'es' ? '¡Reseña actualizada!' : 'Review updated!'}</div>}
          {error && <div className="text-red-400 mt-2">{error}</div>}
        </div>
      </main>
      <Footer />
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
