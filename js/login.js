import { getAuth, signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const msg = document.getElementById("msg");
const btn = document.getElementById("loginBtn");

btn.onclick = async () => {
  msg.innerText = "";

  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passInput.value
    );

    const snap = await getDoc(doc(db, "users", cred.user.uid));

    if (!snap.exists()) {
      msg.innerText = "User profile not found";
      return;
    }

    const role = snap.data().role;

    if (role === "admin") {
      window.location.href = "index.html";
    } else {
      window.location.href = "pos.html";
    }

  } catch (e) {
    msg.innerText = e.message;
  }
};
