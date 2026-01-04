import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const resetBtn = document.getElementById("resetPasswordBtn");
const resetEmail = document.getElementById("resetEmail");
const resetMsg = document.getElementById("resetMsg");

if (resetBtn) {
  resetBtn.addEventListener("click", async () => {
    try {
      const email = resetEmail.value.trim();

      if (!email) {
        resetMsg.innerText = "❌ Enter an email address";
        return;
      }

      await sendPasswordResetEmail(auth, email);
      resetMsg.innerText = "✅ Password reset email sent";

      resetEmail.value = "";
    } catch (e) {
      resetMsg.innerText = "❌ " + e.message;
    }
  });
}
