// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Firebase Auth
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXX",
  authDomain: "univercell-eko-pos.firebaseapp.com",
  projectId: "univercell-eko-pos",
  storageBucket: "univercell-eko-pos.appspot.com",
  messagingSenderId: "XXXXXXXXXX",
  appId: "1:XXXXXXXX:web:XXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Export auth for use in other files
export { auth };
