import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, doc, setDoc, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

const staffEmail = document.getElementById("staffEmail");
const staffPassword = document.getElementById("staffPassword");
const staffMsg = document.getElementById("staffMsg");
const createStaffBtn = document.getElementById("createStaffBtn");

createStaffBtn.onclick = async () => {
  try {
    const email = staffEmail.value.trim();
    const password = staffPassword.value.trim();

    if (!email || password.length < 6) {
      staffMsg.innerText = "Enter valid email & password (min 6)";
      return;
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      role: "staff",
      createdAt: serverTimestamp()
    });

    staffMsg.innerText = "✅ Staff created successfully";

  } catch (e) {
    staffMsg.innerText = e.message;
  }
};
