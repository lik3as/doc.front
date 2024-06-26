import { auth } from "../../api.js";
import { isEmailValid } from "../../utils.js";

const getCredentials = () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  return [email.value, password.value];
}

document.getElementById("login-btn").onclick = async () => {
  const [email, password] = getCredentials();

  if (!isEmailValid(email)) {
    mixinShow("warning", "Digite um e-mail válido!");
    return;
  }
  if (!password) {
    mixinShow("warning", "É necessário providenciar uma senha!");
    return;
  }

  const res = auth(email, password);

  const swalRes = Swal.fire({
    title: "Estamos autenticando você.",
    icon: "info",
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
  })

  const status = (await res).status;
  Swal.hideLoading();

  if (status == 401) {
    Swal.update({
      title: "Credenciais incorretas",
      icon: "error",
      showCancelButton: true,
      cancelButtonText: "Tentar novamente"
    })
    return;
  } else if (status == 400) {
    Swal.update({
      title: "Este usuário ainda não foi cadastrado",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Cadastrar usuário",
      showCancelButton: true,
      cancelButtonText: "Tentar novamente"
    })
    if ((await swalRes).isConfirmed) {
      window.location = "/pages/register-v1.html";
    }
    return;
  }
  const body = await (await res).json();
  localStorage.setItem("token", body.token);

  Swal.close();
  await mixinShow("success", "Você foi autenticado com sucesso")

  window.location = "/app/documentos.html";
}
