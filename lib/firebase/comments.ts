import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface EbookComment {
  ebookTitle: string;
  username: string;
  comment: string;
  rating: number;
  createdAt: Timestamp;
}

// Guardar un comentario
export async function addEbookComment(data: Omit<EbookComment, 'createdAt'>) {
  return await addDoc(collection(db, "ebookComments"), {
    ...data,
    createdAt: Timestamp.now(),
  });
}

// Leer comentarios de un ebook
export async function getEbookComments(ebookTitle: string): Promise<EbookComment[]> {
  const q = query(
    collection(db, "ebookComments"),
    where("ebookTitle", "==", ebookTitle),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as EbookComment);
} 