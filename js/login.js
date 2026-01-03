// 🔹 Firebase imports
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Firestore init
const db = getFirestore();

// 🔹 DOM elements
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

console.log("LOGIN.JS LOADED");

// 🔹 Login logic
loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 1️⃣ Login
    const userCredential =
      await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    // 2️⃣ Fetch Firestore user profile
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      message.innerText = "❌ User profile not found";
      return;
    }

    const userData = userSnap.data();
    console.log("User role:", userData.role);

    // 3️⃣ Redirect based on role
    if (userData.role === "admin") {
      message.innerText = "✅ Admin login successful";
      window.location.href = "index.html";
    } else {
      message.innerText = "✅ Staff login successful";
      window.location.href = "pos.html";
    }

  } catch (error) {
    message.innerText = "❌ " + error.message;
  }
});

