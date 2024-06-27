import { signUp } from "../../api.js";
import { isEmailValid } from "../../utils/validators.js";

const strongPassworddRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/

function isStrongPasswd(passwd) {
  let strength = 0;

  strength += /[A-Z]+/.test(passwd) ? 1 : 0;
  strength += /[a-z]+/.test(passwd) ? 1 : 0;
  strength += /[0-9]+/.test(passwd) ? 1 : 0;
  strength += /[\W]+/.test(passwd) ? 1 : 0;

  return strength >= 4;
}

document.getElementById("signup-btn").onclick = async () => {
  const username = document.getElementById("username").value;
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confPassword = document.getElementById("confirm-password").value;

  if (!username) {
    mixinShow("warning", "Forneça um nome de usuário")
    return;
  }
  if (!fullname) {
    mixinShow("warning", "É necessário fornecer um nome")
    return;
  }
  if (!isEmailValid(email)) {
    mixinShow("warning", "Forneça um e-mail válido")
    return;
  }
  if (!isStrongPasswd(password)) {
    mixinShow("warning", "Forneça uma senha forte")
    return;
  }
  if (confPassword != password) {
    mixinShow("warning", "As senhas precisam ser iguais")
    return;
  }

  const res = signUp({
    fullname: fullname,
    email: email,
    password: password,
    username: username,
    activated: true,
  });

  Swal.fire({
    title: "Criando sua conta",
    icon: "info",
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
  });

  const status = (await res).status;
  Swal.hideLoading();

  switch (status) {
    case 400: {
      Swal.update({
        title: "Este usuário já existe no banco de dados",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Tentar novamente"
      })
      return;
    }
    case 500: {
      Swal.update({
        title: "Nosso sistema está enfrentando problemas no momento. Tente novamente mais tarde",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Tentar novamente"
      })
    }
    default: {
      Swal.close();
      await mixinShow("success", "Conta cadastrada")

      window.location = "/pages/login-v3.html";
    }
  }
}
