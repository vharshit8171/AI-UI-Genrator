import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBki11E9qd3NCTX1sebLYpJJfc6_ZF86mQ",
  authDomain: "ai-website-builder-6f293.firebaseapp.com",
  projectId: "ai-website-builder-6f293",
  storageBucket: "ai-website-builder-6f293.firebasestorage.app",
  messagingSenderId: "909701917367",
  appId: "1:909701917367:web:12136cb360ed840c2dbb32",
  measurementId: "G-N7YBWWYQE2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');