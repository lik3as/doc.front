import { signUp } from "../../api.js";
import { isEmailValid } from "../../utils/validators.js";

document.getElementById("signup-btn").onclick = async () => {
  const username = document.getElementById("username").value;
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!isEmailValid(email)) {}

  const res = await signUp({
    fullname: fullname,
    email: email,
    password: password,
    username: username,
    activated: true,
  });
}
