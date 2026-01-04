import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

loginBtn.onclick = async () => {
  msg.innerText = "";

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const cred = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, "users", cred.user.uid));

    if (!snap.exists()) {
      msg.innerText = "User profile not found";
      return;
    }

    const role = snap.data().role;

    if (role === "admin") {
      window.location.href = "index.html";
    } else if (role === "staff") {
      window.location.href = "pos.html";
    } else {
      msg.innerText = "Invalid role";
    }

  } catch (e) {
    msg.innerText = e.message;
  }
};
