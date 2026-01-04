import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

// Get DOM elements
const createStaffBtn = document.getElementById("createStaffBtn");
const staffEmail = document.getElementById("staffEmail");
const staffPassword = document.getElementById("staffPassword");
const staffMsg = document.getElementById("staffMsg");

// Safety check
if (createStaffBtn) {
  createStaffBtn.addEventListener("click", async () => {
    try {
      const email = staffEmail.value.trim();
      const password = staffPassword.value.trim();

      if (!email || !password) {
        staffMsg.innerText = "❌ Email and password required";
        return;
      }

      // Create staff user
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Save role in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        role: "staff",
        createdAt: serverTimestamp()
      });

      staffMsg.innerText = "✅ Staff created successfully";

      // Clear inputs
      staffEmail.value = "";
      staffPassword.value = "";

    } catch (e) {
      staffMsg.innerText = "❌ " + e.message;
    }
  });
}
