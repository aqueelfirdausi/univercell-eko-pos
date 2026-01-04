import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.onclick = async () => {
  try {
    const email = emailInput.value;
    const password = passwordInput.value;

    const cred = await signInWithEmailAndPassword(auth, email, password);

    const snap = await getDoc(doc(db, "users", cred.user.uid));

    if (!snap.exists()) {
      message.innerText = "User profile not found";
      return;
    }

    const role = snap.data().role;

    if (role === "admin") {
      window.location.href = "index.html";
    } else {
      window.location.href = "pos.html";
    }

  } catch (e) {
    message.innerText = e.message;
  }
};
