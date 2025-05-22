import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCstzKBkqGn1PK4Dv79iJTUA0YYPXdba0",
  authDomain: "cosmicexplorer-e193e.firebaseapp.com",
  projectId: "cosmicexplorer-e193e",
  storageBucket: "cosmicexplorer-e193e.firebasestorage.app",
  messagingSenderId: "892413639844",
  appId: "1:892413639844:web:4638ef784396b8e5547a31"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db, app };
