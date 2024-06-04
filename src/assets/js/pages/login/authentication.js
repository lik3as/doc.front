const API_BASE_URL = "http://localhost:3000";

function showNotification(message, isSuccess) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = isSuccess ? 'success' : '';
  notification.style.display = 'block';
  notification.style.opacity = '1';
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 500);
  }, 3000);
}

async function authenticate() {
  const email = document.querySelector('.form-group input[type="email"]').value;
  const password = document.querySelector('.form-group input[type="password"]').value;

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    body: JSON.stringify({
      user: email,
      password: password,
      method: "email"
    }),
    method: "POST",
    mode: "cors",
    credentials: "include",
    cache: "no-store",
    headers: [
      ["Content-Type", "application/json; charset=utf-8"],
    ]
  });


  switch (res.status) {
    case 200: {
      location.href = "/application/file-manager.html"
      break;
    }
    case 401: {
      showNotification("Credenciais Inválidas", false);
      break;
    }
  }

}
