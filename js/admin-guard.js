import { auth } from "./firebase.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    window.location.href = "login.html";
    return;
  }

  const userData = userSnap.data();

  if (userData.role !== "admin") {
    alert("Access denied");
    window.location.href = "login.html";
  }
});
