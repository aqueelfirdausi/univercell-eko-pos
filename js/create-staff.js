import { getAuth, createUserWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const emailInput = document.getElementById("staffEmail");
const passInput = document.getElementById("staffPassword");
const btn = document.getElementById("createStaffBtn");
const msg = document.getElementById("staffMsg");

btn.onclick = async () => {
  msg.innerText = "";

  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passInput.value
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      email: emailInput.value,
      role: "staff",
      createdAt: serverTimestamp()
    });

    msg.innerText = "✅ Staff created successfully";
  } catch (e) {
    msg.innerText = e.message;
  }
};
