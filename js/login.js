import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

// ✅ FIXED ELEMENT REFERENCES
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const loginMsg = document.getElementById("loginMsg");

loginBtn.addEventListener("click", async () => {
  loginMsg.innerText = "";

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      loginMsg.innerText = "Please enter email and password";
      return;
    }

    // 🔐 Firebase Auth Login
    const cred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 🔎 Fetch user role from Firestore
    const userSnap = await getDoc(
      doc(db, "users", cred.user.uid)
    );

    if (!userSnap.exists()) {
      loginMsg.innerText = "User profile not found";
      return;
    }

    const role = userSnap.data().role;

    // 🔁 ROLE BASED REDIRECT
    if (role === "admin") {
      window.location.href = "index.html";
    } else if (role === "staff") {
      window.location.href = "pos.html";
    } else {
      loginMsg.innerText = "Invalid role";
    }

  } catch (err) {
    loginMsg.innerText = err.message;
  }
});
