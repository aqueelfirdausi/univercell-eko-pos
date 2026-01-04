import { getAuth, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) {
    window.location.href = "login.html";
    return;
  }

  const role = snap.data().role;

  if (role !== "admin" && role !== "staff") {
    window.location.href = "login.html";
  }
});
