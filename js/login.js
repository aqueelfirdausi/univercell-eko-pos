import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const message = document.getElementById("message");
constconst message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    message.innerText = "✅ Login successful";
  } catch (error) {
    message.innerText = "❌ " + error.message;
  }
});
