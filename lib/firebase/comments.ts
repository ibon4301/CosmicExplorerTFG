import { collection, addDoc, query, where, getDocs, orderBy, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface EbookComment {
  ebookTitle: string;
  displayName: string;
  comment: string;
  rating: number;
  createdAt: Timestamp;
  title?: string;
  email?: string | null;
  photoURL?: string | null;
  userId?: string;
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

// Obtener comentarios de un usuario
export async function getUserComments(email: string): Promise<(EbookComment & { id: string })[]> {
  console.log('DEBUG getUserComments email:', email);
  const q = query(
    collection(db, "ebookComments"),
    where("email", "==", email),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  console.log('DEBUG getUserComments docs encontrados:', querySnapshot.size);
  const docs = querySnapshot.docs.map(docSnap => ({ ...(docSnap.data() as EbookComment), id: docSnap.id }));
  console.log('DEBUG getUserComments docs:', docs);
  return docs;
}

// Eliminar comentario por ID
export async function deleteEbookComment(commentId: string) {
  await deleteDoc(doc(db, "ebookComments", commentId));
}

// Editar comentario por ID
export async function editEbookComment(commentId: string, data: Partial<Omit<EbookComment, 'createdAt' | 'username'>>) {
  await updateDoc(doc(db, "ebookComments", commentId), data);
} 