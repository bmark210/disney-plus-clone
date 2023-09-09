import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnatrx2tIqHHIX04dMUdu_B6ZhzI61HgU",
  authDomain: "disney-plus-31061.firebaseapp.com",
  projectId: "disney-plus-31061",
  storageBucket: "disney-plus-31061.appspot.com",
  messagingSenderId: "219231673034",
  appId: "1:219231673034:web:8790fad79b1f4b470f3233",
  measurementId: "G-NMB5LNNPVL"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
