// Firebase core (browser-safe CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Firebase Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration (UniverCell-Eko-POS)
const firebaseConfig = {
  apiKey: "AIzaSyCeINS_1pf7FF2a5W1DVst71gQg4Zq1KaM",
  authDomain: "univercell-eko-pos.firebaseapp.com",
  projectId: "univercell-eko-pos",
  storageBucket: "univercell-eko-pos.firebasestorage.app",
  messagingSenderId: "927485837084",
  appId: "1:927485837084:web:9fe0928147f7893ee4c4d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Export auth for login.js
export { auth };
